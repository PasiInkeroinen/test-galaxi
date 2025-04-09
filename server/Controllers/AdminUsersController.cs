﻿using Microsoft.AspNetCore.Mvc;
using GaLaXiBackend.Data;
using GaLaXiBackend.Models;
using GaLaXiBackend.Models.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace GaLaXiBackend.Controllers
{
    [Route("api/users")]
    [ApiController]
    //[Authorize(Roles = "admin")]
    public class AdminUsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminUsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _context.Users.Select(u => new UserResponseDto
            {
                Id = u.Id,
                Email = u.Email,
                Username = u.Username,
                Role = u.Role,
                CreatedAt = u.CreatedAt
            }).ToList();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound("User not found.");

            var result = new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };

            return Ok(result);
        }

        [HttpGet("{id}/bookings")]
        public IActionResult GetUserWithBookings(int id)
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
                }).ToList();

            var result = new UserWithBookingsDto
            {
                User = new UserResponseDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Username = user.Username,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                },
                Bookings = bookings
            };

            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UpdateUserDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound("User not found.");

            user.Username = dto.Username;
            user.Role = dto.Role;

            _context.SaveChanges();
            return Ok("User updated successfully.");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound("User not found.");

            _context.Users.Remove(user);
            _context.SaveChanges();
            return Ok("User deleted successfully.");
        }
    }
}