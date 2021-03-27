using System;
using System.Threading.Tasks;
using MongoDB.Driver;
using TaskAPI.Models;

namespace TaskAPI.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(ITasksDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UserCollectionName);
        }

        public async Task<User> Create(User user)
        {
            await _users.InsertOneAsync(user);
            return user;
        }
    }
}
