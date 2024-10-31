using Xunit;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolAPI.Controllers;
using SchoolAPI.Data;
using SchoolAPI.Models;
using System.Linq;

namespace SchoolTest
{
    public class EstudiantesControllerTests
    {
        private readonly EstudiantesController _controller;
        private readonly Mock<SchoolContext> _mockContext;

        public EstudiantesControllerTests()
        {
            // Configurar el contexto de base de datos simulado
            _mockContext = new Mock<SchoolContext>(new DbContextOptions<SchoolContext>());
            _controller = new EstudiantesController(_mockContext.Object);
        }

        [Fact]
        public async Task GetEstudiantes_ReturnsListOfEstudiantes()
        {
            // Arrange
            var estudiantes = new List<Estudiante>
            {
                new Estudiante { Id = 1, Nombre = "Juan" },
                new Estudiante { Id = 2, Nombre = "Maria" }
            }.AsQueryable();

            var mockDbSet = new Mock<DbSet<Estudiante>>();
            mockDbSet.As<IQueryable<Estudiante>>().Setup(m => m.Provider).Returns(estudiantes.Provider);
            mockDbSet.As<IQueryable<Estudiante>>().Setup(m => m.Expression).Returns(estudiantes.Expression);
            mockDbSet.As<IQueryable<Estudiante>>().Setup(m => m.ElementType).Returns(estudiantes.ElementType);
            mockDbSet.As<IQueryable<Estudiante>>().Setup(m => m.GetEnumerator()).Returns(estudiantes.GetEnumerator());

            _mockContext.Setup(c => c.Estudiantes).Returns(mockDbSet.Object);

            // Act
            var result = await _controller.GetEstudiantes();

            // Assert
            var okResult = Assert.IsType<ActionResult<IEnumerable<Estudiante>>>(result);
            var returnValue = Assert.IsType<List<Estudiante>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }

        [Fact]
        public async Task GetEstudiante_ReturnsEstudiante_WhenIdIsValid()
        {
            // Arrange
            var estudiante = new Estudiante { Id = 1, Nombre = "Juan" };
            _mockContext.Setup(c => c.Estudiantes.FindAsync(1)).ReturnsAsync(estudiante);

            // Act
            var result = await _controller.GetEstudiante(1);

            // Assert
            var okResult = Assert.IsType<ActionResult<Estudiante>>(result);
            Assert.Equal(estudiante, okResult.Value);
        }

        [Fact]
        public async Task GetEstudiante_ReturnsNotFound_WhenIdIsInvalid()
        {
            // Arrange
            _mockContext.Setup(c => c.Estudiantes.FindAsync(1)).ReturnsAsync((Estudiante)null);

            // Act
            var result = await _controller.GetEstudiante(1);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PostEstudiante_ReturnsCreatedAtAction_WithEstudiante()
        {
            // Arrange
            var estudiante = new Estudiante { Id = 1, Nombre = "Juan" };

            // Act
            var result = await _controller.PostEstudiante(estudiante);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnValue = Assert.IsType<Estudiante>(createdAtActionResult.Value);
            Assert.Equal(estudiante.Id, returnValue.Id);
            Assert.Equal("Juan", returnValue.Nombre);
        }

        [Fact]
        public async Task PutEstudiante_ReturnsNoContent_WhenUpdateIsSuccessful()
        {
            // Arrange
            var estudiante = new Estudiante { Id = 1, Nombre = "Juan" };
            _mockContext.Setup(c => c.Estudiantes.Any(e => e.Id == estudiante.Id)).Returns(true);

            // Act
            var result = await _controller.PutEstudiante(estudiante.Id, estudiante);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task PutEstudiante_ReturnsNotFound_WhenIdIsInvalid()
        {
            // Arrange
            var estudiante = new Estudiante { Id = 1, Nombre = "Juan" };
            _mockContext.Setup(c => c.Estudiantes.Any(e => e.Id == estudiante.Id)).Returns(false);

            // Act
            var result = await _controller.PutEstudiante(estudiante.Id, estudiante);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteEstudiante_ReturnsNoContent_WhenDeleteIsSuccessful()
        {
            // Arrange
            var estudiante = new Estudiante { Id = 1, Nombre = "Juan" };
            _mockContext.Setup(c => c.Estudiantes.FindAsync(1)).ReturnsAsync(estudiante);

            // Act
            var result = await _controller.DeleteEstudiante(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteEstudiante_ReturnsNotFound_WhenIdIsInvalid()
        {
            // Arrange
            _mockContext.Setup(c => c.Estudiantes.FindAsync(1)).ReturnsAsync((Estudiante)null);

            // Act
            var result = await _controller.DeleteEstudiante(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
