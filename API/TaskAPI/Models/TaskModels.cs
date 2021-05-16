using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TaskAPI.Models
{
    public class MongoTaskModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRequired]
        public string Title { get; set; }

        [BsonRequired]
        public string Description { get; set; }

        [BsonRequired]
        public bool Completed { get; set; }
    }

    public class Task
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }
    }
}
