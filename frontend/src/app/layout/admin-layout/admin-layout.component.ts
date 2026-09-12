import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  navOpen = false;
  private sub?: Subscription;

  readonly links = [
    { path: '/dashboard', label: 'Dashboard', hint: 'Overview' },
    { path: '/blogs', label: 'Blogs', hint: 'Posts & drafts' },
    { path: '/about', label: 'About', hint: 'Page content' },
    { path: '/pages', label: 'Pages', hint: 'Static pages' },
    { path: '/settings', label: 'Settings', hint: 'Site details' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.closeNav());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    this.navOpen = false;
  }
}
