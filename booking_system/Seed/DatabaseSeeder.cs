using booking_system.DTO;
using booking_system.Interfaces;
using booking_system.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

namespace booking_system.Seed
{
    public static class DatabaseSeeder
    {
        public static async Task SeedAdminUserAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();

            var adminDto = new RegisterRequestDTO
            {
                FirstName = "mohamed",
                LastName = "ahmed",
                PhoneNumber = "01148828444",
                Email = "admin@gmail.com",
                Password = "123", // use a strong default
                Role = "Admin"
            };

            var result = await authService.RegisterAsync(adminDto);

            if (result == "User already exists")
            {
                Console.WriteLine(" Admin user already exists.");
            }
            else
            {
                Console.WriteLine(" Admin user seeded successfully.");
            }
        }
    }
}
