using booking_system.Models;

namespace booking_system.Interfaces
{
    public interface IUserRepository
    {

        Task<User> GetUserByIdAsync(int userId);
        Task<User> GetUserByEmailAsync(string email);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<bool> IsEmailRegisteredAsync(string email);
        Task<bool> CreateUserAsync(User user);
        Task<bool> UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(int userId);
        Task<bool> SaveChangesAsync();

        Task<User> GetByRefreshToken(string refreshToken);
    }
}
