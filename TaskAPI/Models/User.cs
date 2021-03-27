using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace TaskAPI.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRequired]
        public string Email { get; set; }

        [BsonRequired]
        public string Password { get; set; }
    }
}
