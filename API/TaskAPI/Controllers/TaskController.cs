using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskAPI.Models;
using TaskAPI.Models.DTOs.Requests;
using TaskAPI.Models.DTOs.Responses;
using TaskAPI.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskAPI.Controllers
{
    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;
        private readonly UserService _userService;
        private readonly IMapper _mapper;

        public TaskController(TaskService taskService, UserService userService, IMapper mapper)
        {
            _mapper = mapper;
            _taskService = taskService;
            _userService = userService;
        }

        [HttpPost("/api/task")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> createTask([FromBody] TaskCreationDto taskDto)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Id").Value;
            var user = await _userService.GetUserById(userId);

            var task = _mapper.Map<Models.Task>(taskDto);

            var mongoTask = await _taskService.Create(user, task);

            return Ok(new TaskResponse {
                Data = mongoTask
            });
        }

        [HttpPatch("/api/task/{id:Guid}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> toggleTaskCompletion(string id)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Id").Value;
            var user = await _userService.GetUserById(userId);

            if (await _taskService.CanToggleTask(user, id))
            {
                return Ok();
            }

            return Unauthorized();
        }

        [HttpGet("/api/task")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> getTasks()
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Id").Value;

            var user = await _userService.GetUserById(userId);

            var tasks = await _taskService.GetTasks(user);

            return Ok(new TasksResponse
            {
                Data = tasks
            });
        }
    }
}
