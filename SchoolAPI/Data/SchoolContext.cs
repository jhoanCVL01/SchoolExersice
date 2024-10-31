using Microsoft.EntityFrameworkCore;
using SchoolAPI.Models;

namespace SchoolAPI.Data
{
    /// <summary>
    /// Establece un conexto de EF para tareas de bases de datos
    /// </summary>
    public class SchoolContext : DbContext
    {
        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="SchoolContext"/>.
        /// </summary>
        /// <param name="options"></param>
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options) { }

        /// <summary>
        /// Establecimiento de los conjuntos de datos
        /// </summary>
        public DbSet<Estudiante> Estudiantes { get; set; }
        public DbSet<Profesor> Profesores { get; set; }
        public DbSet<Nota> Notas { get; set; }

        /// <summary>
        /// Configuracion de restricciones y relaciones de los modelos
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Nota>()
                .HasOne(n => n.Profesor)
                .WithMany(p => p.Notas)
                .HasForeignKey(n => n.IdProfesor)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Nota>()
                .HasOne(n => n.Estudiante)
                .WithMany(e => e.Notas)
                .HasForeignKey(n => n.IdEstudiante)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
