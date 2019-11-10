import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { PaginaVotacionComponent } from './pagina-votacion/pagina-votacion.component';
import { PaginaEstadoComponent } from './pagina-estado/pagina-estado.component';
const routes: Routes = [
    {path: 'home', component: PaginaPrincipalComponent},
    {path: 'vota', component: PaginaVotacionComponent },
    {path: 'ver', component: PaginaEstadoComponent },
    {path: '**', pathMatch: 'full', redirectTo: ''}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const app_routing = RouterModule.forRoot(routes);