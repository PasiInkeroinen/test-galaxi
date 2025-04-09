using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GaLaXiBackend.Data;
using GaLaXiBackend.Models.Dtos;

namespace GaLaXiBackend.Controllers
{
    [Route("api/bookings")]
    [ApiController]
    //[Authorize(Roles = "admin")]
    public class AdminBookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminBookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllBookings()
        {
            var bookings = _context.Bookings
                .Select(b => new BookingResponseDto
                {
                    Id = b.Id,
                    Description = b.Description,
                    StartTime = b.StartTime,
                    EndTime = b.EndTime,
                    ComputerId = b.ComputerId,
                    IsRoomBooking = b.IsRoomBooking,
                    RoomBookingType = b.RoomBookingType
                })
                .ToList();

            return Ok(bookings);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBooking(int id, [FromBody] UpdateBookingDto dto)
        {
            var booking = _context.Bookings.FirstOrDefault(b => b.Id == id);
            if (booking == null) return NotFound("Booking not found.");

            booking.Description = dto.Description;
            booking.StartTime = dto.StartTime;
            booking.EndTime = dto.EndTime;
            booking.ComputerId = dto.ComputerId;
            booking.IsRoomBooking = dto.IsRoomBooking;
            booking.RoomBookingType = dto.RoomBookingType;

            _context.SaveChanges();
            return Ok("Booking updated successfully.");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBooking(int id)
        {
            var booking = _context.Bookings.FirstOrDefault(b => b.Id == id);
            if (booking == null) return NotFound("Booking not found.");

            _context.Bookings.Remove(booking);
            _context.SaveChanges();
            return Ok("Booking deleted successfully.");
        }
    }
}
