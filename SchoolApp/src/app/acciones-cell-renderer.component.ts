// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-renderer',
  template: `
     <button class="btn btn-danger btn-sm" (click)="eliminar()">
      <i class="fas fa-trash"></i> 
    </button>
    <button class="btn btn-primary btn-sm" (click)="editar()" data-bs-toggle="modal" data-bs-target="#EditModal">
      <i class="fas fa-edit"></i> 
    </button>
    `
})

export class AccionesCellRendererComponent implements ICellRendererAngularComp { 

  params:any;
  label:string = "";

  agInit(params:any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  eliminar() {
    if (this.params.eliminar instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        rowData: this.params.node.data
        // ...something
      }
      this.params.eliminar(params);

    }
  }
  editar() {
    if (this.params.editar instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        rowData: this.params.node.data
        // ...something
      }
      this.params.editar(params);

    }
  }
}