using System;
using System.ComponentModel.DataAnnotations;

namespace GaLaXiBackend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; } // Changed from Guid to int

        [Required, EmailAddress]
        public required string Email { get; set; } // User's email address

        [Required]
        public required string Username { get; set; } // Display name of the user

        [Required]
        public string Role { get; set; } = "user"; // User role (default is "user")

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Timestamp of account creation
    }
}
