using System;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TaskAPI.Configuration;
using TaskAPI.Models;
using TaskAPI.Models.DTOs.Requests;
using TaskAPI.Services;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using TaskAPI.Models.DTOs.Responses;

namespace TaskAPI.Controllers
{
    public class AuthManagementController : ControllerBase
    {
        private readonly JwtConfig _jwtConfig;
        private readonly UserService _userService;
        private readonly IMapper _mapper;

        public AuthManagementController(IOptionsMonitor<JwtConfig> optionsMonitor, UserService userService, IMapper mapper)
        {
            _jwtConfig = optionsMonitor.CurrentValue;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userRequest)
        {
            if (ModelState.IsValid)
            {
                var userFromRequest = _mapper.Map<User>(userRequest);
                var authenticatedUser = await _userService.AuthenticateUser(userFromRequest);
                if (authenticatedUser != null)
                {
                    var jwtToken = GenerateJwtToken(authenticatedUser);
                    return Ok(new RegistrationResponse
                    {
                        Success = true,
                        Token = jwtToken
                    });
                } else
                {
                    return Unauthorized();
                }
            } else
            {
                return BadRequest();
            }
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto userRequest)
        {
            if (ModelState.IsValid)
            {
                var isExisting = await _userService.UserExists(userRequest.Email);
                if (isExisting)
                {
                    return BadRequest();
                }

                var createdUser = await _userService.Create(_mapper.Map<User>(userRequest));
                if(createdUser != null)
                {
                    var jwtToken = GenerateJwtToken(createdUser);

                    return Ok(new RegistrationResponse
                    {
                        Success = true,
                        Token = jwtToken
                    });
                } else
                {
                    return BadRequest();
                }
            } else
            {
                return BadRequest();
            }
        }

        private string GenerateJwtToken(MongoUserModel user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new []
                {
                    new Claim("Id", user.Id),
                    new Claim("Email", user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(6),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
