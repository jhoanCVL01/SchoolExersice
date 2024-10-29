import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  notas: any[] = [];
  nuevaNota = { id: 0, nombre: '', valor: 0, idProfesor: 0, idEstudiante: 0 };
  profesores: any[] = [];
  estudiantes: any[] = [];
  modalTitle: string = 'Nueva Nota';
  editMode: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarNotas();
    this.cargarProfesores();
    this.cargarEstudiantes();
  }

  cargarNotas(): void {
    this.apiService.getNotas()
      .then(response => this.notas = response.data)
      .catch(error => console.error('Error al cargar notas:', error));
  }

  cargarProfesores(): void {
    this.apiService.getProfesores()
      .then(response => this.profesores = response.data)
      .catch(error => console.error('Error al cargar profesores:', error));
  }

  cargarEstudiantes(): void {
    this.apiService.getEstudiantes()
      .then(response => this.estudiantes = response.data)
      .catch(error => console.error('Error al cargar estudiantes:', error));
  }

  editarNota(nota: any): void {
    this.modalTitle = 'Editar Nota';
    this.nuevaNota = { ...nota };
    this.editMode = true;
  }

  guardarNota(): void {
    if (this.editMode) {
      this.apiService.updateNota(this.nuevaNota.id, this.nuevaNota)
        .then(() => this.cargarNotas())
        .catch(error => console.error('Error al actualizar nota:', error));
    } else {
      this.apiService.createNota(this.nuevaNota)
        .then(() => this.cargarNotas())
        .catch(error => console.error('Error al crear nota:', error));
    }
  }

  eliminarNota(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta nota?')) {
      this.apiService.deleteNota(id)
        .then(() => this.cargarNotas())
        .catch(error => console.error('Error al eliminar nota:', error));
    }
  }
}