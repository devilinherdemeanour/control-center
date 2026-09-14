import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';

const routes: Routes = [{ path: '', component: ContactEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactAdminRoutingModule {}
