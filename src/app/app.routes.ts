import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { AcercaDeComponent } from './routes/acerca-de/acerca-de.component';
import { HistoryComponent } from './routes/history/history.component';
import { VistaProductosComponent } from './components/vista-productos/vista-productos.component';
import { MasInfoComponent } from './components/mas-info/mas-info.component';
import { ProductoGeneralComponent } from './components/producto-general/producto-general.component';
import { ContactComponent } from './routes/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: 'his', component: HistoryComponent },
  { path: 'productos', component: VistaProductosComponent },
  { path: 'productos/general', component: ProductoGeneralComponent },
  { path: 'mas-info', component: MasInfoComponent },
  { path: 'productos/general',loadComponent: () => import('./components/producto-general/producto-general.component').then(m => m.ProductoGeneralComponent)},
  { path: 'mas-info', component: MasInfoComponent },
  { path: 'contactos', component: ContactComponent },

];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
