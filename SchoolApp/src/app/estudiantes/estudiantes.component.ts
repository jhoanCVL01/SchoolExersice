import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  estudiantes: any[] = [];
  nuevoEstudiante = { id: 0, nombre: '' }; // Modelo para crear un estudiante
  modalTitle: string = 'Nuevo Estudiante';
  editMode: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarEstudiantes();
    setTimeout(() => {
      $('#datatableexample').DataTable({
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu: [5, 10, 25],
        dom: 'Blfrtip'
      });
    }, 1);
  }

  
  cargarEstudiantes(): void {
    this.apiService.getEstudiantes()
      .then(response => {
        this.estudiantes = response.data
        
       
      })
      .catch(error =>
        console.error('Error al cargar estudiantes:', error)
      );
  }


  crearEstudiante(): void {
    if (this.nuevoEstudiante.nombre.trim() === '') {
      alert('El nombre del estudiante es obligatorio');
      return;
    }

    this.apiService.createEstudiante(this.nuevoEstudiante)
      .then(() => {
        this.cargarEstudiantes(); 
        this.nuevoEstudiante.nombre = ''; 
      })
      .catch(error => console.error('Error al crear estudiante:', error));
  }


  eliminarEstudiante(id: number): void {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      this.apiService.deleteEstudiante(id)
        .then(() => this.cargarEstudiantes()) 
        .catch(error => console.error('Error al eliminar estudiante:', error));
    }
  }

  nuevoEstudianteModal(): void {
    this.modalTitle = 'Nuevo Estudiante';
    this.nuevoEstudiante = { id: 0, nombre: '' };
    this.editMode = false;
  }


  editarEstudiante(estudiante: any): void {
    this.modalTitle = 'Editar Estudiante';
    this.nuevoEstudiante = { ...estudiante };
    this.editMode = true;
  }


  guardarEstudiante(): void {
    if (this.editMode) {
      this.apiService.updateEstudiante(this.nuevoEstudiante.id, this.nuevoEstudiante)
        .then(() => this.cargarEstudiantes())
        .catch(error => console.error('Error al actualizar estudiante:', error));
    } else {
      this.apiService.createEstudiante(this.nuevoEstudiante)
        .then(() => this.cargarEstudiantes())
        .catch(error => console.error('Error al crear estudiante:', error));
    }
  }


}
