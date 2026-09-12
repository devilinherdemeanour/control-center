import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsEditorComponent } from './settings-editor/settings-editor.component';

const routes: Routes = [{ path: '', component: SettingsEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
