import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PageListComponent } from './page-list/page-list.component';
import { PageFormComponent } from './page-form/page-form.component';

@NgModule({
  declarations: [PageListComponent, PageFormComponent],
  imports: [SharedModule, PagesRoutingModule],
})
export class PagesModule {}
