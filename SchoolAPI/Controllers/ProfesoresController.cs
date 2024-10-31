using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolAPI.Data;
using SchoolAPI.Models;

namespace SchoolAPI.Controllers
{
    /// <summary>
    /// Controlador para funciones crud de profesores
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesoresController : ControllerBase
    {
        private readonly SchoolContext _context;
        /// <summary>
        ///  Inicializa una nueva instancia de la clase <see cref="ProfesoresController"/>.
        /// </summary>
        /// <param name="context"></param>
        public ProfesoresController(SchoolContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Consulta la lista de profesores
        /// </summary>
        /// <returns>Lista</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profesor>>> GetProfesores()
        {
            return await _context.Profesores.ToListAsync();
        }

        /// <summary>
        /// Consulta un profesor por ID
        /// </summary>
        /// <returns>Registro Concreto</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Profesor>> GetProfesor(int id)
        {
            var profesor = await _context.Profesores.FindAsync(id);

            if (profesor == null)
            {
                return NotFound();
            }

            return profesor;
        }

        /// <summary>
        /// Crea un profesor
        /// </summary>
        /// <param name="profesor"></param>
        /// <returns>Registro Creado</returns>
        [HttpPost]
        public async Task<ActionResult<Profesor>> PostProfesor(Profesor profesor)
        {
            _context.Profesores.Add(profesor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProfesores), new { id = profesor.Id }, profesor);
        }

        /// <summary>
        /// Modifica un profesor
        /// </summary>
        /// <param name="id"></param>
        /// <param name="profesor"></param>
        /// <returns>Registro Creado</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfesor(int id, Profesor profesor)
        {
            if (id != profesor.Id)
            {
                return BadRequest();
            }

            _context.Entry(profesor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Profesores.Any(e => e.Id == id))
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
        /// Elimina un profesor
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfesor(int id)
        {
            var profesor = await _context.Profesores.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            try
            {
                _context.Profesores.Remove(profesor);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException != null && ex.InnerException.Message.Contains("FK_Notas_Profesores"))
                {
                    return Conflict(new
                    {
                        message = "No se puede eliminar el profesor porque tiene notas asociadas."
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
