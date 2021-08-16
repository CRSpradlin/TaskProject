using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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

        public async Task<MongoTaskModel> Create(MongoUserModel user, Models.Task task)
        {
            var mongoTask = _mapper.Map<MongoTaskModel>(task);

            await _tasks.InsertOneAsync(mongoTask);

            user.TaskIds.Add(mongoTask.Id);

            var userFilter = Builders<MongoUserModel>.Filter.Eq("Id", user.Id);
            var userUpdate = Builders<MongoUserModel>.Update.Set("TaskIds", user.TaskIds);
            await _users.UpdateOneAsync(userFilter, userUpdate);

            return mongoTask;
        }

        public async Task<List<MongoTaskModel>> GetTasks(MongoUserModel user)
        {
            var data = new List<MongoTaskModel>();

            foreach(var taskId in user.TaskIds)
            {
                data.Add(await _tasks.Find(task => task.Id == taskId).FirstOrDefaultAsync());
            }

            return data;
        }

        public async Task<bool> CanToggleTask(MongoUserModel user, string taskId)
        {
            if (user.TaskIds.Contains(taskId))
            {
                var task = await _tasks.Find(task => task.Id == taskId).FirstOrDefaultAsync();

                var taskFilter = Builders<MongoTaskModel>.Filter.Eq("Id", taskId);
                var taskUpdate = Builders<MongoTaskModel>.Update.Set("Completed", !task.Completed);

                return true;
            }
            return false;
        }
    }
}
