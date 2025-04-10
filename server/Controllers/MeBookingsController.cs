using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GaLaXiBackend.Data;
using GaLaXiBackend.Models;
using GaLaXiBackend.Models.Dtos;

namespace GaLaXiBackend.Controllers
{
    [Route("api/me/bookings")]
    [ApiController]
    [Authorize]
    public class MeBookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MeBookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetMyBookings()
        {
            var userId = int.Parse(User.Identity?.Name ?? "0");

            var bookings = _context.Bookings
                .Where(b => b.UserId == userId)
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

        [HttpPost]
        public IActionResult CreateMyBooking([FromBody] CreateBookingDto dto)
        {
            var userId = int.Parse(User.Identity?.Name ?? "0");

            var booking = new Booking
            {
                Description = dto.Description,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                ComputerId = dto.ComputerId,
                IsRoomBooking = dto.IsRoomBooking,
                RoomBookingType = dto.RoomBookingType,
                UserId = userId
            };

            _context.Bookings.Add(booking);
            _context.SaveChanges();

            return Ok(new { Message = "Booking created successfully", BookingId = booking.Id });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMyBooking(int id, [FromBody] UpdateBookingDto dto)
        {
            var userId = int.Parse(User.Identity?.Name ?? "0");

            var booking = _context.Bookings.FirstOrDefault(b => b.Id == id && b.UserId == userId);
            if (booking == null) return NotFound("Booking not found.");

            booking.Description = dto.Description;
            booking.StartTime = dto.StartTime;
            booking.EndTime = dto.EndTime;
            booking.ComputerId = dto.ComputerId;
            booking.IsRoomBooking = dto.IsRoomBooking;
            booking.RoomBookingType = dto.RoomBookingType;

            _context.SaveChanges();
            return Ok("Booking updated.");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMyBooking(int id)
        {
            var userId = int.Parse(User.Identity?.Name ?? "0");

            var booking = _context.Bookings.FirstOrDefault(b => b.Id == id && b.UserId == userId);
            if (booking == null) return NotFound("Booking not found.");

            _context.Bookings.Remove(booking);
            _context.SaveChanges();
            return Ok("Booking deleted.");
        }
    }
}
