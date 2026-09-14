import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ContactAdminRoutingModule } from './contact-admin-routing.module';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';

@NgModule({
  declarations: [ContactEditorComponent],
  imports: [SharedModule, ContactAdminRoutingModule],
})
export class ContactAdminModule {}
