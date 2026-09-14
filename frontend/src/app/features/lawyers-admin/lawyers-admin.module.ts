import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LawyersAdminRoutingModule } from './lawyers-admin-routing.module';
import { LawyerAdminListComponent } from './lawyer-admin-list/lawyer-admin-list.component';
import { LawyerAdminFormComponent } from './lawyer-admin-form/lawyer-admin-form.component';

@NgModule({
  declarations: [LawyerAdminListComponent, LawyerAdminFormComponent],
  imports: [SharedModule, LawyersAdminRoutingModule],
})
export class LawyersAdminModule {}
