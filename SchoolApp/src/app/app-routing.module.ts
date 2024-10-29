import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { NotasComponent } from './notas/notas.component';

const routes: Routes = [
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'profesores', component: ProfesoresComponent },
  { path: 'notas', component: NotasComponent },
  //{ path: '', redirectTo: '/estudiantes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
