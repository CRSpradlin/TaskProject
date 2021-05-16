using System;
using AutoMapper;
using MongoDB.Driver;
using TaskAPI.Models;

namespace TaskAPI.Services
{
    public class TaskService
    {
        private readonly IMongoCollection<MongoTaskModel> _tasks;
        private readonly IMongoCollection<MongoUserModel> _users;

        private IMapper _mapper;

        public TaskService(ITasksDatabaseSettings settings, IMapper mapper)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _mapper = mapper;

            _tasks = database.GetCollection<MongoTaskModel>(settings.TaskCollectionName);
            _users = database.GetCollection<MongoUserModel>(settings.UserCollectionName);
        }


    }
}
