using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [StringLength(12, MinimumLength = 3, ErrorMessage = "User names must be 3 to 12 characters long.")]
        public string UserName { get; set; }
        [Required]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "Passwords must be 4 to 12 characters long.")]
        public string Password { get; set; }
    }
}