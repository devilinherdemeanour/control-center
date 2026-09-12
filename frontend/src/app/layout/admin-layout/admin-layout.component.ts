import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  navOpen = false;

  readonly links = [
    { path: '/dashboard', label: 'Dashboard', hint: 'Overview' },
    { path: '/blogs', label: 'Blogs', hint: 'Posts & drafts' },
    { path: '/about', label: 'About', hint: 'Page content' },
    { path: '/pages', label: 'Pages', hint: 'Static pages' },
    { path: '/settings', label: 'Settings', hint: 'Site details' },
  ];

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    this.navOpen = false;
  }
}
