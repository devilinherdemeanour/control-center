import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageListComponent } from './page-list/page-list.component';
import { PageFormComponent } from './page-form/page-form.component';

const routes: Routes = [
  { path: '', component: PageListComponent },
  { path: 'new', component: PageFormComponent },
  { path: ':id/edit', component: PageFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
