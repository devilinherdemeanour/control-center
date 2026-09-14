import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminListComponent } from './user-admin-list/user-admin-list.component';
import { UserAdminFormComponent } from './user-admin-form/user-admin-form.component';

const routes: Routes = [
  { path: '', component: UserAdminListComponent },
  { path: 'new', component: UserAdminFormComponent },
  { path: ':id/edit', component: UserAdminFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersAdminRoutingModule {}
