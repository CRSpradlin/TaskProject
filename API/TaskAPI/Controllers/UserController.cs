using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskAPI.Models;
using TaskAPI.Models.DTOs.Requests;
using TaskAPI.Services;

namespace TaskAPI.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IMapper _mapper;
        
        public UserController(UserService userService, IMapper mapper)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost("/checkAuth")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult AuthorizationCheck()
        {
            var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Id").Value;
            var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Email").Value;

            Console.WriteLine("User with Id: " + id + " and email of: " + email + " just logged in!");

            return Ok(email);
        }

        [HttpPost("/user")]
        public async Task<ActionResult> TestPostUser([FromBody] UserRegistrationDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Add user map to map postUser object to mongoUser object
            //Find good place for postUser (maybe in services folder)

            var response = await _userService.Create(_mapper.Map<User>(user));

            return Ok(response);
        }

        public class testExistRequest
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }
        }

        [HttpPost("/exist")]
        public async Task<ActionResult> TestUserExists([FromBody] testExistRequest req)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Add user map to map postUser object to mongoUser object
            //Find good place for postUser (maybe in services folder)

            var response = await _userService.UserExists(req.Email);

            return Ok(response);
        }
    }
}
