namespace booking_system.DTO
{
    public class EventDTO
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Venue { get; set; } // e.g. "Stadium A"
        public decimal Price { get; set; }
        public IFormFile Image { get; set; }

    }
}
