using System;
using System.Collections.Generic;

namespace TaskAPI.Models.DTOs.Responses
{
    public class TasksResponse
    {
        public List<MongoTaskModel> Data { get; set; }
    }
}
