using System.Text.Json.Serialization;

namespace SchoolAPI.Models
{
    public class Nota
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        public int Valor { get; set; }
        public int IdProfesor { get; set; }
        public int IdEstudiante { get; set; }
        public Profesor? Profesor { get; set; }
        public Estudiante? Estudiante { get; set; }
    }
}
