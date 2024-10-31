import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { GridApi } from 'ag-grid-community';
import { AccionesCellRendererComponent } from '../acciones-cell-renderer.component'; 

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {
  profesores: any[] = [];
  nuevoProfesor = { id: 0, nombre: '' };
  modalTitle: string = 'Nuevo Profesor';
  editMode: boolean = false;

  private gridApi!: GridApi;
  frameworkComponents: any;
  columnDefs = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'nombre', headerName: 'Nombre', sortable: true, filter: true },
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        eliminar: this.eliminarProfesor.bind(this),
        editar: this.editarProfesor.bind(this),
        label: 'Click'
      },width: 80
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
    this.cargarProfesores();

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

  eliminarProfesor(e: any): void {

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
        this.apiService.deleteProfesor(e.rowData.id)
          .then(() => {
            Swal.fire(
              '¡Eliminado!',
              'El profesor ha sido eliminado.',
              'success'
            );
            this.cargarProfesores();
          })
          .catch(error => {
            console.error('Error al eliminar profesor:', error);
            Swal.fire(
              'Error',
              error.response.data.message,
              'error'
            );
          });
      }
    });
  }

  nuevoProfesorModal(): void {
    this.modalTitle = 'Nuevo Profesor';
    this.nuevoProfesor = { id: 0, nombre: '' };
    this.editMode = false;
  }

  editarProfesor(e: any): void {
    this.modalTitle = 'Editar Profesor';
    const profesor = this.profesores.find(est => est.id === e.rowData.id);
    this.nuevoProfesor = { ...profesor };
    this.editMode = true;
  }

  guardarProfesor(form: NgForm): void {
    if (form.valid) {
      if (this.editMode) {
        this.apiService.updateProfesor(this.nuevoProfesor.id, this.nuevoProfesor)
          .then(() => {this.cargarProfesores()
            this.showsucces('El estudiante se modificó correctamente')
          })
          .catch(error => this.showerror('Error al modificar profesor:' + error));
      } else {
        this.apiService.createProfesor(this.nuevoProfesor)
          .then(() => {this.cargarProfesores()
            this.showsucces('El profesor se guardó correctamente')
          })
          .catch(error => this.showerror('Error al crear profesor:'+ error));
      }
    }
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
    this.nuevoProfesor.nombre = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
