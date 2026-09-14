import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceAdminListComponent } from './service-admin-list/service-admin-list.component';
import { ServiceAdminFormComponent } from './service-admin-form/service-admin-form.component';

const routes: Routes = [
  { path: '', component: ServiceAdminListComponent },
  { path: 'new', component: ServiceAdminFormComponent },
  { path: ':id/edit', component: ServiceAdminFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesAdminRoutingModule {}
