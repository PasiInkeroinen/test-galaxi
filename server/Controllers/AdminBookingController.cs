using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GaLaXiBackend.Data;
using GaLaXiBackend.Models;
using Microsoft.AspNetCore.Authorization;

namespace GaLaXiBackend.Controllers.Admin
{
    [Route("api/admin/bookings")]
    [ApiController]
    //[Authorize(Roles = "admin")]
    public class AdminBookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminBookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /api/admin/bookings
        // Supports filtering and pagination
        [HttpGet]
        public IActionResult GetBookings(
            [FromQuery] int? userId,
            [FromQuery] int? computerId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var query = _context.Bookings
                .Include(b => b.User)
                .AsQueryable();

            if (userId.HasValue)
            {
                query = query.Where(b => b.UserId == userId.Value);
            }

            if (computerId.HasValue)
            {
                query = query.Where(b => b.ComputerId == computerId.Value);
            }

            var totalCount = query.Count();

            var bookings = query
                .OrderByDescending(b => b.StartTime)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                total = totalCount,
                page,
                pageSize,
                items = bookings
            });
        }

        // DELETE: /api/admin/bookings/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteBooking(int id)
        {
            var booking = _context.Bookings.Find(id);
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            _context.Bookings.Remove(booking);
            _context.SaveChanges();

            return Ok("Booking deleted successfully.");
        }
    }
}
