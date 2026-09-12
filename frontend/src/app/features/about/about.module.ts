import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutEditorComponent } from './about-editor/about-editor.component';

@NgModule({
  declarations: [AboutEditorComponent],
  imports: [SharedModule, AboutRoutingModule],
})
export class AboutModule {}
