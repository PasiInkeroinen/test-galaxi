using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GaLaXiBackend.Data;
using GaLaXiBackend.Models;
using GaLaXiBackend.Models.Dtos;

namespace GaLaXiBackend.Controllers
{
    [Route("api/admin")]
    [ApiController]
    //[Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Example: Get all users and their booking count
        [HttpGet("users-with-bookings")]
        public IActionResult GetUsersWithBookingCounts()
        {
            var users = _context.Users.ToList();

            var result = users.Select(user => new
            {
                UserId = user.Id,
                user.Username,
                user.Email,
                BookingCount = _context.Bookings.Count(b => b.UserId == user.Id)
            });

            return Ok(result);
        }

        // Example: Get all bookings for a user
        [HttpGet("users/{id}/bookings")]
        public IActionResult GetUserBookings(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound("User not found.");

            var bookings = _context.Bookings
                .Where(b => b.UserId == id)
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

        // Example: Delete all bookings from a specific user
        [HttpDelete("users/{id}/bookings")]
        public IActionResult DeleteAllBookingsForUser(int id)
        {
            var bookings = _context.Bookings.Where(b => b.UserId == id).ToList();
            if (!bookings.Any()) return NotFound("No bookings found for user.");

            _context.Bookings.RemoveRange(bookings);
            _context.SaveChanges();

            return Ok("All bookings for user deleted.");
        }
    }
}
