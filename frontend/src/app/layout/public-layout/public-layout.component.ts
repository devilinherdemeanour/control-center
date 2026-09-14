import { Component } from '@angular/core';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent {
  navOpen = false;
  readonly currentYear = new Date().getFullYear();

  readonly navLinks = [
    { label: 'Haqqımızda', path: '/haqqimizda' },
    { label: 'Xidmətlər', path: '/xidmetler' },
    { label: 'Komanda', path: '/komanda' },
    { label: 'Bloq', path: '/bloq' },
    { label: 'Əlaqə', path: '/elaqe' },
  ];

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    this.navOpen = false;
  }
}
