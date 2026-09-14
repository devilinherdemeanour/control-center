import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ServicesAdminRoutingModule } from './services-admin-routing.module';
import { ServiceAdminListComponent } from './service-admin-list/service-admin-list.component';
import { ServiceAdminFormComponent } from './service-admin-form/service-admin-form.component';

@NgModule({
  declarations: [ServiceAdminListComponent, ServiceAdminFormComponent],
  imports: [SharedModule, ServicesAdminRoutingModule],
})
export class ServicesAdminModule {}
