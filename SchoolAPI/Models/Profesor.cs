using System.Text.Json.Serialization;

namespace SchoolAPI.Models
{
    /// <summary>
    /// Clase que representa un profesor en el Sistemas
    /// </summary>
    public class Profesor
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        [JsonIgnore]
        public List<Nota>? Notas { get; set; }
    }
}
