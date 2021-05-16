using System;
namespace TaskAPI.Models
{
    public class TasksDatabaseSettings : ITasksDatabaseSettings
    {
        public string TaskCollectionName { get; set; }
        public string UserCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ITasksDatabaseSettings
    {
        string TaskCollectionName { get; set; }
        string UserCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
