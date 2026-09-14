import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'admin/login',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'blogs',
        loadChildren: () => import('./features/blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'xeberler',
        loadChildren: () => import('./features/news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'xidmetler',
        loadChildren: () =>
          import('./features/services-admin/services-admin.module').then(
            (m) => m.ServicesAdminModule
          ),
      },
      {
        path: 'vekiller',
        loadChildren: () =>
          import('./features/lawyers-admin/lawyers-admin.module').then((m) => m.LawyersAdminModule),
      },
      {
        path: 'elaqe',
        loadChildren: () =>
          import('./features/contact-admin/contact-admin.module').then((m) => m.ContactAdminModule),
      },
      {
        path: 'istifadeciler',
        loadChildren: () =>
          import('./features/users-admin/users-admin.module').then((m) => m.UsersAdminModule),
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'pages',
        loadChildren: () => import('./features/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
