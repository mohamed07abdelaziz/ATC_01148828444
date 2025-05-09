using booking_system.DTO;
using booking_system.Interfaces;
using booking_system.Models;
using booking_system.Repositories;
using booking_system.Services;
using System.Security.Cryptography;
using System.Text;
namespace booking_system.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public AuthService(IUserRepository userRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDTO dto)
        {
            var user = await _userRepository.GetUserByEmailAsync(dto.Email);
            if (user == null || !VerifyPassword(dto.Password, user.HashedPassword))
                throw new Exception("Invalid credentials");

            var token = _jwtService.GenerateJWTTOken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();
            _jwtService.SaveRefreshTokenAsync(refreshToken, user);

            return new AuthResponseDto
            {
                Token = token,
                RefreshToken = refreshToken
            };

        }

        public async Task<AuthResponseDto> NewRefreshTokenAsync(string refreshToken)
        {
            var user = await _userRepository.GetByRefreshToken(refreshToken);
            if (user == null || user.RefreshTokenExpiryTime < DateTime.Now)
                throw new Exception("Invalid refresh token");

            var newJwtToken = _jwtService.GenerateJWTTOken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            await _jwtService.SaveRefreshTokenAsync(newRefreshToken, user);

            return new AuthResponseDto
            {
                Token = newJwtToken,
                RefreshToken = newRefreshToken
            };

        }

        public async Task<string> RegisterAsync(RegisterRequestDTO dto)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(dto.Email);
            if (existingUser != null)
                throw new Exception("User already exists");

            var hashedPassword = HashPassword(dto.Password);

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                HashedPassword = hashedPassword,
                PhoneNumber=dto.PhoneNumber,
                Role = dto.Role,
                RefreshToken = null,
                RefreshTokenExpiryTime = DateTime.UtcNow
            };

            await _userRepository.CreateUserAsync(user);
            return "User registered successfully";
        }


        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }


        private bool VerifyPassword(string inputPassword, string storedHashedPassword)
        {
            return HashPassword(inputPassword) == storedHashedPassword;
        }
    }
}
