using Microsoft.AspNetCore.Identity;

namespace booking_system.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string FirstName { get; set; } 

        public string LastName { get; set; } 
         
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }

        public string Role { get; set; } // "Admin" or "User"

        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public ICollection<Booking> Bookings { get; set; }
    }
}
