import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { NotasComponent } from './notas/notas.component';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AgGridModule } from 'ag-grid-angular';
import { AccionesCellRendererComponent } from './acciones-cell-renderer.component'; 

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    ProfesoresComponent,
    NotasComponent,
    AccionesCellRendererComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
