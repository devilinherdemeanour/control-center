import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsEditorComponent } from './settings-editor/settings-editor.component';

@NgModule({
  declarations: [SettingsEditorComponent],
  imports: [SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
