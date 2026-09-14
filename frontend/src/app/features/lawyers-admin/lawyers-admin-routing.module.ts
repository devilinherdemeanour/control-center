import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawyerAdminListComponent } from './lawyer-admin-list/lawyer-admin-list.component';
import { LawyerAdminFormComponent } from './lawyer-admin-form/lawyer-admin-form.component';

const routes: Routes = [
  { path: '', component: LawyerAdminListComponent },
  { path: 'new', component: LawyerAdminFormComponent },
  { path: ':id/edit', component: LawyerAdminFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawyersAdminRoutingModule {}
