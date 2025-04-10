//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using GaLaXiBackend.Data;
//using GaLaXiBackend.Models;
//using GaLaXiBackend.Models.Dtos;

//namespace GaLaXiBackend.Controllers
//{
//    [Route("api/me/bookings")]
//    [ApiController]
//    [Authorize] // Ensure only logged-in users can access
//    public class BookingController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public BookingController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost]
//        public IActionResult CreateBooking([FromBody] CreateBookingDto dto)
//        {
//            var userIdString = User.Identity?.Name;

//            if (!int.TryParse(userIdString, out int userId))
//            {
//                return Unauthorized("Invalid user identity.");
//            }

//            if (dto == null)
//            {
//                return BadRequest("Booking data is required.");
//            }

//            var booking = new Booking
//            {
//                UserId = userId,
//                Description = dto.Description,
//                StartTime = dto.StartTime,
//                EndTime = dto.EndTime,
//                ComputerId = dto.ComputerId,
//                IsRoomBooking = dto.IsRoomBooking,
//                RoomBookingType = dto.RoomBookingType,
//                CreatedAt = DateTime.UtcNow,
//            };

//            _context.Bookings.Add(booking);
//            _context.SaveChanges();

//            var result = new BookingResponseDto
//            {
//                Id = booking.Id,
//                Description = booking.Description,
//                StartTime = booking.StartTime,
//                EndTime = booking.EndTime,
//                ComputerId = booking.ComputerId,
//                IsRoomBooking = booking.IsRoomBooking,
//                RoomBookingType = booking.RoomBookingType
//            };

//            return Ok(new { message = "Booking created successfully.", booking = result });
//        }
//    }
//}
