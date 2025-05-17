using booking_system.Models;

namespace booking_system.Interfaces
{
    public interface IEventRepo
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event> GetEventByIdAsync(int id);
        Task<bool> CreateEventAsync(Event eventObj, IFormFile image);
        Task<bool> UpdateEventAsync(Event eventObj, IFormFile image);
        Task<bool> DeleteEventAsync(int id);
        Task<IEnumerable<Event>> GetEventsByDateAsync(DateTime Date);
        Task<IEnumerable<Event>> GetEventsByLocationAsync(string location);
        Task<IEnumerable<Event>> GetEventsByCategorysync(string Category);

        Task<bool> SaveChangesAsync();
    }
}
