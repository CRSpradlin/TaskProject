using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace TaskAPI.Models
{
    public class MongoUserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRequired]
        public string Email { get; set; }

        [BsonRequired]
        public string HashedPassword { get; set; }
    }

    public class User
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
