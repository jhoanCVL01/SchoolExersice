using System.Text.Json.Serialization;

namespace SchoolAPI.Models
{
    public class Estudiante
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        [JsonIgnore]
        public List<Nota>? Notas { get; set; }
    }
}
