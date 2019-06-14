import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerarOrdenCompraComponent } from './generar-orden-compra/generar-orden-compra.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { VerOrdenCompraComponent } from './ver-orden-compra/ver-orden-compra.component';
import { EditarOrdenesComponent } from './editar-ordenes/editar-ordenes.component';
import { MisPendientesComponent } from './mis-pendientes/mis-pendientes.component';

const routes: Routes = [
  { path: '', redirectTo: 'generar-orden', pathMatch: 'full' },
  { path: 'imprimir', component: OrdenCompraComponent },
  { path: 'generar-orden', component: GenerarOrdenCompraComponent },
  { path: 'Ver-Orden-Compra', component: VerOrdenCompraComponent },
  { path: 'Ordenes-pendientes', component: MisPendientesComponent },
  { path: 'editar-orden', component: EditarOrdenesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
