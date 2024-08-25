import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { InfoEmpresaComponent } from './info-empresa/info-empresa.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { GObjetivoComponent } from './g-objetivo/g-objetivo.component';
import { AppDashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    /*path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'greeting',
        loadChildren: () =>
          import('./pages/greeting/greeting.module').then((m) => m.GreetingModule),
      },
    ]*/
    path: '', component: AppDashboardComponent
    },
  {path: "empresa", component: InfoEmpresaComponent},
  {path: 'solicitud', component: SolicitudComponent},
  {path: 'gobjetivo', component: GObjetivoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
