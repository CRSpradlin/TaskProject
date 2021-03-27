using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskAPI.Models;
using TaskAPI.Services;

namespace TaskAPI.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("/user")]
        public async Task<ActionResult> TestPostUser(User user)
        {
            //Add user map to map postUser object to mongoUser object
            //Find good place for postUser (maybe in services folder)

            var response = await _userService.Create(user);

            return Ok(response);
        }
    }
}
