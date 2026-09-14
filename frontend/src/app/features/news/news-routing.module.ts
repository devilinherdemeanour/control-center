import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsFormComponent } from './news-form/news-form.component';

const routes: Routes = [
  { path: '', component: NewsListComponent },
  { path: 'new', component: NewsFormComponent },
  { path: ':id/edit', component: NewsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
