using System;
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
                .ForMember(dest => dest.HashedPassword, opt => opt.MapFrom(source => UserService.ComputeSha256Hash(source.Password)));
            CreateMap<UserRegistrationDto, User>();
            CreateMap<UserLoginDto, User>();
        }

    }
}
