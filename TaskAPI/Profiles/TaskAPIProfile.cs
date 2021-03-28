using System;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using TaskAPI.Models;

namespace TaskAPI.Profiles
{
    public class TaskAPIProfile : Profile
    {
        public TaskAPIProfile()
        {
            CreateMap<User, MongoUserModel>()
                .ForMember(dest => dest.HashedPassword, opt => opt.MapFrom(source => _computeSha256Hash(source.Password)));
        }

        private string _computeSha256Hash(string rawData)
        {
            // Create a SHA256   
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
