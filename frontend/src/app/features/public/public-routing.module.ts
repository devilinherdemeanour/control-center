import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'haqqimizda', component: AboutPageComponent },
      { path: 'xidmetler', component: ServicesPageComponent },
      { path: 'xidmetler/:id', component: ServiceDetailComponent },
      { path: 'komanda', component: TeamPageComponent },
      { path: 'komanda/:id', component: LawyerDetailComponent },
      { path: 'bloq', component: NewsPageComponent },
      { path: 'bloq/:id', component: NewsDetailComponent },
      { path: 'elaqe', component: ContactPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
