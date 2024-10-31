import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { GridApi } from 'ag-grid-community';
import { AccionesCellRendererComponent } from '../acciones-cell-renderer.component';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  notas: any[] = [];
  nuevaNota = { id: 0, nombre: '', valor: 0, idProfesor: '', idEstudiante: '' };
  profesores: any[] = [];
  estudiantes: any[] = [];
  modalTitle: string = 'Nueva Nota';
  editMode: boolean = false; 

  private gridApi!: GridApi;
  frameworkComponents: any;
  columnDefs = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'nombre', headerName: 'Nombre', sortable: true, filter: true },
    { field: 'profesor.nombre', headerName: 'Profesor', sortable: true, filter: true },
    { field: 'estudiante.nombre', headerName: 'Estudiante', sortable: true, filter: true },
    { field: 'valor', headerName: 'Valor', sortable: true, filter: true },
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        eliminar: this.eliminarNota.bind(this),
        editar: this.editarNota.bind(this),
        label: 'Click'
      } ,width: 80
    }

  ];
  constructor(private apiService: ApiService) {
    this.frameworkComponents = {
      buttonRenderer: AccionesCellRendererComponent,
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

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


  editarNota(e: any): void {
    this.modalTitle = 'Editar Nota';
    const nota = this.notas.find(est => est.id === e.rowData.id);
    this.nuevaNota = { ...nota };
    this.editMode = true;
  }

  guardarNota(form: NgForm): void {
    if (form.valid) {
      this.nuevaNota.nombre = this.nuevaNota.nombre.charAt(0).toUpperCase() + this.nuevaNota.nombre.slice(1).toLowerCase();
      if (this.editMode) {
        this.apiService.updateNota(this.nuevaNota.id, this.nuevaNota)
          .then(() => {
            this.cargarNotas()
            this.showsucces('La nota se modificó correctamente')
          })
          .catch(error => this.showerror('Error al modificar la nota:' + error));
      } else {
        this.apiService.createNota(this.nuevaNota)
        .then(() => {
          this.cargarNotas()
          this.showsucces('La nota se guardó correctamente')
        })
        .catch(error => this.showerror('Error al crear la nota:' + error));
      }
    }
  }

  eliminarNota(e: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteNota(e.rowData.id)
          .then(() => {
            Swal.fire(
              '¡Eliminado!',
              'La nota se ha sido eliminado.',
              'success'
            );
            this.cargarNotas();
          })
          .catch(error => {
            console.error('Error al eliminar nota:', error);
            Swal.fire(
              'Error',
              error.response.data.message,
              'error'
            );
          });
      }
    });
  }

  showerror(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje
    })
  }
  showsucces(mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: mensaje,
      showConfirmButton: false,
      timer: 3000
    });
  }

  capitalizarPrimeraLetra(value: string) {
    // Capitaliza solo la primera letra y convierte el resto a minúsculas
    this.nuevaNota.nombre = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}