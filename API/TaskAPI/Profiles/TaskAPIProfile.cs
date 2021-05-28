using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using TaskAPI.Models;
using TaskAPI.Models.DTOs.Requests;
using TaskAPI.Services;

namespace TaskAPI.Profiles
{
    public class TaskAPIProfile : Profile
    {
        public TaskAPIProfile()
        {
            CreateMap<User, MongoUserModel>()
                .ForMember(dest => dest.HashedPassword, opt => opt.MapFrom(source => DataService.ComputeSha256Hash(source.Password)));
            CreateMap<UserRegistrationDto, User>();
            CreateMap<UserLoginDto, User>()
                .ForMember(dest => dest.TaskIds, opt => opt.Equals(new List<string>()));

            CreateMap<Task, MongoTaskModel>();
            CreateMap<TaskCreationDto, Task>()
                .ForMember(dest => dest.Completed, opt => opt.Equals(false));
        }

    }
}
