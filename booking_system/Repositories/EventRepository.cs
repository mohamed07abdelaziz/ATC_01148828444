using booking_system.Interfaces;
using booking_system.Models;
using Microsoft.EntityFrameworkCore;

namespace booking_system.Repositories
{
    public class EventRepository : IEventRepo
    {
        private readonly ApplicationDbContext _context;
        public EventRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateEventAsync(Event eventObj, IFormFile image)
        {

            await _context.Events.AddAsync(eventObj);
            if (image != null && image.Length > 0)
            {
                // Generate a unique file name for the image
                var fileName = $"{eventObj.EventId}_{image.FileName}";
                var filePath = Path.Combine("wwwroot/images", fileName);

                // Save the image to the file system
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                // Set the ImageUrl property of the event
                eventObj.ImageUrl = $"/images/{fileName}";
            }
            return await SaveChangesAsync();

        }
        public async Task<bool> DeleteEventAsync(int id)
        {
            _context.Events.Remove(await GetEventByIdAsync(id));
            return await SaveChangesAsync();
        }
        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await _context.Events.ToListAsync();
        }
        public  async Task<Event> GetEventByIdAsync(int id)
        {
            return await _context.Events.FirstOrDefaultAsync(e => e.EventId == id);

        }
        public async Task<IEnumerable<Event>> GetEventsByCategorysync(string Category)
        {
            return await _context.Events.Where(e => e.Category == Category).ToListAsync();
        }
        public async Task<IEnumerable<Event>> GetEventsByDateAsync(DateTime Date)
        {

            // comparing on date only not the time 
            return await _context.Events.Where(e => e.Date.Date == Date.Date).ToListAsync();

        }
        public async Task<IEnumerable<Event>> GetEventsByLocationAsync(string location)
        {
           return await _context.Events.Where(e => e.Venue == location).ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateEventAsync(Event eventObj)
        {



            _context.Events.Update(eventObj);
            return await SaveChangesAsync();
        }

        
    }

}

