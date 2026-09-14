import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  navOpen = false;
  private sub?: Subscription;

  readonly links = [
    { path: '/admin/dashboard', label: 'Dashboard', hint: 'Ümumi' },
    { path: '/admin/xeberler', label: 'Xəbərlər', hint: 'News' },
    { path: '/admin/xidmetler', label: 'Xidmətlər', hint: 'Services' },
    { path: '/admin/vekiller', label: 'Vəkillər', hint: 'Lawyers' },
    { path: '/admin/elaqe', label: 'Əlaqə', hint: 'Contact' },
    { path: '/admin/istifadeciler', label: 'İstifadəçilər', hint: 'Admins' },
    { path: '/admin/about', label: 'Haqqımızda', hint: 'About' },
    { path: '/admin/settings', label: 'Ayarlar', hint: 'Settings' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
