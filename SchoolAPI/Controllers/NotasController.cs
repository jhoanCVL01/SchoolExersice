using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolAPI.Data;
using SchoolAPI.Models;

namespace SchoolAPI.Controllers
{
    /// <summary>
    /// Controlador para funciones crud de NOTAS
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class NotasController : ControllerBase
    {
        private readonly SchoolContext _context;
        /// <summary>
        ///  Inicializa una nueva instancia de la clase <see cref="NotasController"/>.
        /// </summary>
        /// <param name="context"></param>
        public NotasController(SchoolContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Consulta la lista de notas
        /// </summary>
        /// <returns>Lista</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nota>>> GetNotas()
        {
            return await _context.Notas.Include(n => n.Profesor).Include(n => n.Estudiante).ToListAsync();
        }


        /// <summary>
        /// Consulta una nota por ID
        /// </summary>
        /// <returns>Registro Concreto</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Nota>> GetNota(int id)
        {
            var nota = await _context.Notas.FindAsync(id);

            if (nota == null)
            {
                return NotFound();
            }

            return nota;
        }


        /// <summary>
        /// Crea una nota
        /// </summary>
        /// <param name="nota"></param>
        /// <returns>Registro Creado</returns>
        [HttpPost]
        public async Task<ActionResult<Nota>> PostNota(Nota nota)
        {
            _context.Notas.Add(nota);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNotas), new { id = nota.Id }, nota);
        }

        /// <summary>
        /// Modifica una nota
        /// </summary>
        /// <param name="id"></param>
        /// <param name="nota"></param>
        /// <returns>Registro Creado</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNota(int id, Nota nota)
        {
            if (id != nota.Id)
            {
                return BadRequest();
            }

            _context.Entry(nota).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Notas.Any(e => e.Id == id))
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
        /// Elimina una nota
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNota(int id)
        {
            var nota = await _context.Notas.FindAsync(id);
            if (nota == null)
            {
                return NotFound();
            }

            _context.Notas.Remove(nota);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
