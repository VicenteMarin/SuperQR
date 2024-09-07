import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { InfoEmpresaComponent } from './info-empresa/info-empresa.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { GObjetivoComponent } from './g-objetivo/g-objetivo.component';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes: Routes = [
  {path: '', component: InfoEmpresaComponent},
  {path: 'solicitud', component: SolicitudComponent},
  {path: 'gobjetivo', component: GObjetivoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
