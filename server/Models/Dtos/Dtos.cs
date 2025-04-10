﻿namespace GaLaXiBackend.Models.Dtos
{
    public class UserResponseDto
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string Username { get; set; }
        public required string Role { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class UpdateUserDto
    {
        public required string Username { get; set; }
        public required string Role { get; set; }
    }

    public class BookingResponseDto
    {
        public int Id { get; set; }
        public required string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int? ComputerId { get; set; }
        public bool IsRoomBooking { get; set; }
        public string? RoomBookingType { get; set; }
    }

    public class CreateBookingDto
    {
        public required string Description { get; set; }
        public required DateTime StartTime { get; set; }
        public required DateTime EndTime { get; set; }
        public int? ComputerId { get; set; }
        public bool IsRoomBooking { get; set; }
        public string? RoomBookingType { get; set; }

    }

    public class UpdateBookingDto
    {
        public required string Description { get; set; }
        public required DateTime StartTime { get; set; }
        public required DateTime EndTime { get; set; }
        public int? ComputerId { get; set; }
        public bool IsRoomBooking { get; set; }
        public string? RoomBookingType { get; set; }
    }

    public class LoginRequestDto
    {
        public string Email { get; set; } = string.Empty;
    }

    public class UserWithBookingsDto
    {
        public required UserResponseDto User { get; set; }
        public required List<BookingResponseDto> Bookings { get; set; }
    }
}
