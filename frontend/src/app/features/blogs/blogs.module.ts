import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogFormComponent } from './blog-form/blog-form.component';

@NgModule({
  declarations: [BlogListComponent, BlogFormComponent],
  imports: [SharedModule, BlogsRoutingModule],
})
export class BlogsModule {}
