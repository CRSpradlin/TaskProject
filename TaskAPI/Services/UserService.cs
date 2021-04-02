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

        public async Task<MongoUserModel> GetUser(string id)
        {
            var response = await _users.Find(user => user.Id == id).FirstOrDefaultAsync();
            return response;
        }
    }
}
