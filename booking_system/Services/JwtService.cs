using booking_system.Interfaces;
using booking_system.Models;
using booking_system.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace booking_system.Services
{
    public class JwtService
    {
        private readonly IConfiguration _configuration;

        private readonly IUserRepository _userRepository;



        public JwtService(IConfiguration configuration,IUserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository= userRepository;
        }   
        public string GenerateJWTTOken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.NameIdentifier, user.Email),
                new Claim(ClaimTypes.UserData, user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };
            Console.WriteLine("user roleee",user.Role);
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task SaveRefreshTokenAsync(string refreshToken,User user)
        {
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime= DateTime.Now.AddDays(7);

            await _userRepository.UpdateUserAsync(user);
           
        }
  
    }
}
