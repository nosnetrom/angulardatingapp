using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Connection
    {
        public Connection() // Default constructor, to prevent Entity Framework errors
        {

        }
        public Connection(string connectionId, string username)
        {
            ConnectionId = connectionId;
            Username = username;
        }
        public string ConnectionId { get; set; }

        public string Username { get; set; }
    }
}