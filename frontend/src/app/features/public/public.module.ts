import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';
import { PublicLayoutComponent } from '../../layout/public-layout/public-layout.component';
import { HomeComponent } from './home/home.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { LawyerDetailComponent } from './lawyer-detail/lawyer-detail.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    HomeComponent,
    AboutPageComponent,
    ServicesPageComponent,
    ServiceDetailComponent,
    TeamPageComponent,
    LawyerDetailComponent,
    NewsPageComponent,
    NewsDetailComponent,
    ContactPageComponent,
    SafeUrlPipe,
  ],
  imports: [SharedModule, PublicRoutingModule],
  exports: [PublicRoutingModule],
})
export class PublicModule {}
