using System;
using System.ComponentModel.DataAnnotations;

namespace TaskAPI.Models.DTOs.Requests
{
    public class UserLoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
