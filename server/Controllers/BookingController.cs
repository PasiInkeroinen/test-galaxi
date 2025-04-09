using Microsoft.AspNetCore.Mvc;
using GaLaXiBackend.Data;
using GaLaXiBackend.Models;
using GaLaXiBackend.Models.Dtos;

namespace GaLaXiBackend.Controllers
{
    [Route("api/book")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateBooking([FromBody] CreateBookingDto dto)
        {
            if (dto == null) return BadRequest("Booking data is required.");

            if (!_context.Users.Any(u => u.Id == dto.UserId))
                return BadRequest("Invalid User ID.");

            var booking = new Booking
            {
                Description = dto.Description,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                ComputerId = dto.ComputerId,
                IsRoomBooking = dto.IsRoomBooking,
                RoomBookingType = dto.RoomBookingType,
                CreatedAt = DateTime.UtcNow,
                UserId = dto.UserId  // ✅ Now passed from client
            };

            _context.Bookings.Add(booking);
            _context.SaveChanges();

            var result = new BookingResponseDto
            {
                Id = booking.Id,
                Description = booking.Description,
                StartTime = booking.StartTime,
                EndTime = booking.EndTime,
                ComputerId = booking.ComputerId,
                IsRoomBooking = booking.IsRoomBooking,
                RoomBookingType = booking.RoomBookingType
            };

            return Ok(new { message = "Booking created successfully.", booking = result });
        }
    }
}
