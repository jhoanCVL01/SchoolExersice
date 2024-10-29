import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent  implements OnInit{
  profesores: any[] = [];
  nuevoProfesor = { id: 0, nombre: '' }; 
  modalTitle: string = 'Nuevo Profesor';
  editMode: boolean = false;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarProfesores();
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

  cargarProfesores(): void {
    this.apiService.getProfesores()
      .then(response => {
        this.profesores = response.data
      })
      .catch(error =>
        console.error('Error al cargar profesores:', error)
      );
  }

  crearProfesor(): void {
    if (this.nuevoProfesor.nombre.trim() === '') {
      alert('El nombre del profesor es obligatorio');
      return;
    }

    this.apiService.createProfesor(this.nuevoProfesor)
      .then(() => {
        this.cargarProfesores(); 
        this.nuevoProfesor.nombre = ''; 
      })
      .catch(error => console.error('Error al crear profesor:', error));
  }

  eliminarProfesor(id: number): void {
    if (confirm('¿Estás seguro de eliminar este profesor?')) {
      this.apiService.deleteProfesor(id)
        .then(() => this.cargarProfesores())
        .catch(error => console.error('Error al eliminar profesor:', error));
    }
  }

  nuevoProfesorModal(): void {
    this.modalTitle = 'Nuevo Profesor';
    this.nuevoProfesor = { id: 0, nombre: '' };
    this.editMode = false;
  }

  editarProfesor(profesor: any): void {
    this.modalTitle = 'Editar Profesor';
    this.nuevoProfesor = { ...profesor }; 
    this.editMode = true;
  }

  guardarProfesor(): void {
    if (this.editMode) {
      this.apiService.updateProfesor(this.nuevoProfesor.id, this.nuevoProfesor)
        .then(() => this.cargarProfesores())
        .catch(error => console.error('Error al actualizar profesor:', error));
    } else {
      this.apiService.createProfesor(this.nuevoProfesor)
        .then(() => this.cargarProfesores())
        .catch(error => console.error('Error al crear profesor:', error));
    }
  }

}
