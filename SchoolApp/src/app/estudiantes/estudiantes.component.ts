import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { GridApi } from 'ag-grid-community';
import { AccionesCellRendererComponent } from '../acciones-cell-renderer.component'; 

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  estudiantes: any[] = [];
  nuevoEstudiante = { id: 0, nombre: '' };

  modalTitle: string = 'Nuevo Estudiante';
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
        eliminar: this.eliminarEstudiante.bind(this),
        editar: this.editarEstudiante.bind(this),
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
    this.cargarEstudiantes();
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


  eliminarEstudiante(e: any): void {
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
        this.apiService.deleteEstudiante(e.rowData.id)
          .then(() => {
            Swal.fire(
              '¡Eliminado!',
              'El estudiante ha sido eliminado.',
              'success'
            );
            this.cargarEstudiantes();
          })
          .catch(error => {
            console.error('Error al eliminar estudiante:', error);
            Swal.fire(
              'Error',
              error.response.data.message,
              'error'
            );
          });
      }
    });
  }

  nuevoEstudianteModal(): void {
    this.modalTitle = 'Nuevo Estudiante';
    this.nuevoEstudiante = { id: 0, nombre: '' };
    this.editMode = false;
  }

  editarEstudiante(e: any): void {
    this.modalTitle = 'Editar Estudiante';
    const estudiante = this.estudiantes.find(est => est.id === e.rowData.id);
    this.nuevoEstudiante = { ...estudiante };
    this.editMode = true;
  }

  guardarEstudiante(form: NgForm): void {
    if (form.valid) {
      if (this.editMode) {
        this.apiService.updateEstudiante(this.nuevoEstudiante.id, this.nuevoEstudiante)
          .then(
            () => {
              this.cargarEstudiantes()
              this.showsucces('El estudiante se modificó correctamente')
            })
          .catch(error => this.showerror('Error al modificar estudiante:' + error));
      } else {
        this.apiService.createEstudiante(this.nuevoEstudiante)
          .then(() => {
            this.cargarEstudiantes()
            this.showsucces('El estudiante se guardó correctamente')
          })
          .catch(error => this.showerror('Error al crear estudiante:' + error));
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
    this.nuevoEstudiante.nombre = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
