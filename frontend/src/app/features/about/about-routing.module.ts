import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutEditorComponent } from './about-editor/about-editor.component';

const routes: Routes = [{ path: '', component: AboutEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
