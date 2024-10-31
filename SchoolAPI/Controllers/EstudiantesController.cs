using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolAPI.Data;
using SchoolAPI.Models;

namespace SchoolAPI.Controllers
{
    /// <summary>
    /// Controlador para funciones crud de estudiantes
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController : ControllerBase
    {
        private readonly SchoolContext _context;
        /// <summary>
        ///  Inicializa una nueva instancia de la clase <see cref="EstudiantesController"/>.
        /// </summary>
        /// <param name="context"></param>
        public EstudiantesController(SchoolContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Consulta la lista de estudiantes
        /// </summary>
        /// <returns>Lista</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estudiante>>> GetEstudiantes()
        {
            return await _context.Estudiantes.ToListAsync();
        }

        /// <summary>
        /// Consulta un estudiante por ID
        /// </summary>
        /// <returns>Registro Concreto</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Estudiante>> GetEstudiante(int id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);

            if (estudiante == null)
            {
                return NotFound();
            }

            return estudiante;
        }

        /// <summary>
        /// Crea un estudiante
        /// </summary>
        /// <param name="estudiante"></param>
        /// <returns>Registro Creado</returns>
        [HttpPost]
        public async Task<ActionResult<Estudiante>> PostEstudiante(Estudiante estudiante)
        {
            _context.Estudiantes.Add(estudiante);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEstudiante), new { id = estudiante.Id }, estudiante);
        }

        /// <summary>
        /// Modifica un estudiante
        /// </summary>
        /// <param name="id"></param>
        /// <param name="estudiante"></param>
        /// <returns>Registro Creado</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstudiante(int id, Estudiante estudiante)
        {
            if (id != estudiante.Id)
            {
                return BadRequest();
            }

            _context.Entry(estudiante).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Estudiantes.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Elimina un Estudiante
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstudiante(int id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null)
            {
                return NotFound();
            }

            try
            {
                _context.Estudiantes.Remove(estudiante);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException != null && ex.InnerException.Message.Contains("FK_Notas_Estudiantes"))
                {
                    return Conflict(new
                    {
                        message = "No se puede eliminar el estudiante porque tiene notas asociadas."
                    });
                }

                return StatusCode(500, new
                {
                    message = "Ocurrió un error al intentar eliminar el registro.",
                    detalles = ex.Message
                });
            }
        }
    }
}
