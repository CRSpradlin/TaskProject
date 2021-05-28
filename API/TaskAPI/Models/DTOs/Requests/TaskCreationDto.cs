using System;
using System.ComponentModel.DataAnnotations;

namespace TaskAPI.Models.DTOs.Requests
{
    public class TaskCreationDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
