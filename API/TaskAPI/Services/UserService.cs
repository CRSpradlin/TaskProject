using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Driver;
using TaskAPI.Models;

namespace TaskAPI.Services
{
    public class UserService
    {
        private readonly IMongoCollection<MongoUserModel> _users;
        private IMapper _mapper;
        private MapperConfiguration _mapperConfig;

        public UserService(ITasksDatabaseSettings settings, IMapper mapper, MapperConfiguration mapperConfig)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _mapper = mapper;
            _mapperConfig = mapperConfig;

            _users = database.GetCollection<MongoUserModel>(settings.UserCollectionName);
        }

        public async Task<MongoUserModel> Create(User user)
        {
            var mongoUser = _mapper.Map<MongoUserModel>(user);

            await _users.InsertOneAsync(mongoUser);

            return mongoUser;
        }

        public async Task<MongoUserModel> GetUserById(string id)
        {
            var response = await _users.Find(user => user.Id == id).FirstOrDefaultAsync();

            return response;
        }

        public async Task<MongoUserModel> GetUserByEmail(string email)
        {
            var response = await _users.Find(user => user.Email == email).FirstOrDefaultAsync();

            return response;
        }

        public async Task<MongoUserModel> AuthenticateUser(User userToVerify)
        {
            if (await UserExists(userToVerify.Email))
            {
                var actualUser = await GetUserByEmail(userToVerify.Email);
                if(actualUser.HashedPassword == ComputeSha256Hash(userToVerify.Password))
                {
                    return actualUser;
                }
                return null;
            } else
            {
                return null;
            }
        }

        public async Task<bool> UserExists(string email)
        {
            var response = false;

            var userResult = await _users.Find(user => user.Email == email).FirstOrDefaultAsync();
            
            if (userResult != null)
            {
                response = true;
            }

            return response;
        }


        public static string ComputeSha256Hash(string rawData)
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
