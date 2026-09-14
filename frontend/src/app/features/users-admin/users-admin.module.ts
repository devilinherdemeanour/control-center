import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsersAdminRoutingModule } from './users-admin-routing.module';
import { UserAdminListComponent } from './user-admin-list/user-admin-list.component';
import { UserAdminFormComponent } from './user-admin-form/user-admin-form.component';

@NgModule({
  declarations: [UserAdminListComponent, UserAdminFormComponent],
  imports: [SharedModule, UsersAdminRoutingModule],
})
export class UsersAdminModule {}
