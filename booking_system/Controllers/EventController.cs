using booking_system.DTO;
using booking_system.Interfaces;
using booking_system.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace booking_system.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventRepo _eventRepo;

        public EventController(IEventRepo eventRepo)
        {
            _eventRepo = eventRepo;
        }
        
        [HttpGet("getallevents")]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _eventRepo.GetAllEventsAsync();
            return Ok(events);
        }
        
        [HttpGet("geteventbyid/{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var eventObj = await _eventRepo.GetEventByIdAsync(id);
            if (eventObj == null)
                return NotFound("Event not found");
            return Ok(eventObj);
        }
        // make event the Admin only can create an event 

        //[Authorize(Roles = "Admin")]
        //[HttpPost]
        //public async Task<IActionResult> CreateEvent([FromBody] EventDTO dto, [FromForm] IFormFile image)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    var eventObj = new Event
        //    {
        //        Name = dto.Name,
        //        Description = dto.Description,
        //        Category = dto.Category,
        //        Date = dto.Date,
        //        Venue = dto.Venue,
        //        Price = dto.Price,
        //    };

        //    var result = await _eventRepo.CreateEventAsync(eventObj, image);
        //    if (!result)
        //        return BadRequest("Failed to create event");

        //    return Ok("Event created successfully");
        //}

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateEvent([FromForm] EventDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var eventObj = new Event
            {
                Name = dto.Name,
                Description = dto.Description,
                Category = dto.Category,
                Date = dto.Date,
                Venue = dto.Venue,
                Price = dto.Price,
            };

            var result = await _eventRepo.CreateEventAsync(eventObj, dto.Image);
            if (!result)
                return BadRequest("Failed to create event");

            return Ok("Event created successfully");
        }



        //edit event only admin can edit
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateEvent(int id, [FromForm] EventDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var eventObj = await _eventRepo.GetEventByIdAsync(id);
            if (eventObj == null)
                return NotFound("Event not found");

            // Update eventObj properties from dto
            eventObj.Name = dto.Name;
            eventObj.Description = dto.Description;
            eventObj.Category = dto.Category;
            eventObj.Date = dto.Date;
            eventObj.Venue = dto.Venue;
            eventObj.Price = dto.Price;

            // If you want to update the image, handle dto.Image here

            var result = await _eventRepo.UpdateEventAsync(eventObj, dto.Image);
            if (!result)
                return BadRequest("Failed to update event");
            return Ok("Event updated successfully");


        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventObj = await _eventRepo.GetEventByIdAsync(id);
            if (eventObj == null)
                return NotFound("Event not found");

            var result = await _eventRepo.DeleteEventAsync(id);
            if (!result)
                return BadRequest("Failed to delete event");

            return Ok("Event deleted successfully");
        }


    }
    }
