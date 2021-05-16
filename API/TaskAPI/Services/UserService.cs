using System;
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

        public UserService(ITasksDatabaseSettings settings, IMapper mapper)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _mapper = mapper;

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
                if(actualUser.HashedPassword == DataService.ComputeSha256Hash(userToVerify.Password))
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
    }
}
