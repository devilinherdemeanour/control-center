import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsFormComponent } from './news-form/news-form.component';

@NgModule({
  declarations: [NewsListComponent, NewsFormComponent],
  imports: [SharedModule, NewsRoutingModule],
})
export class NewsModule {}
