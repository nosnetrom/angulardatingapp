using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Group
    {
        public Group()
        {
            
        }
        public Group(string name)
        {
            Name = name;
        }
        [Key]
        public string Name { get; set; } // acting as a primary key

        public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }
}