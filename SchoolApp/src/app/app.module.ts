import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { NotasComponent } from './notas/notas.component';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    ProfesoresComponent,
    NotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
