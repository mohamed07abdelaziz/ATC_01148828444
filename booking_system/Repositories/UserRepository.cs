using booking_system.Interfaces;
using booking_system.Models;
using Microsoft.EntityFrameworkCore;

namespace booking_system.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }
       

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {

            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        }

        public async Task<bool> IsEmailRegisteredAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<bool> SaveChangesAsync()
        {

            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<bool> CreateUserAsync(User user)
        {
            await _context.Users.AddAsync(user);

            return await SaveChangesAsync();
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await GetUserByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            _context.Users.Remove(user);
            return await SaveChangesAsync();
        }
        public async Task<bool> UpdateUserAsync(User user)
        {
             _context.Users.Update(user);
            return await SaveChangesAsync();
        }

        public async Task<User> GetByRefreshToken(string refreshToken)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

        }
    }
}
