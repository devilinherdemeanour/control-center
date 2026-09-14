import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirmService, Lawyer } from '../../../core/models/content.models';
import { FirmServicesService } from '../../../core/services/firm-services.service';
import { LawyerService } from '../../../core/services/lawyer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  services: FirmService[] = [];
  lawyers: Lawyer[] = [];

  readonly heroCards = [
    {
      title: 'Görüş təyin et',
      subtitle: 'Sizə uyğun vaxtda peşəkar hüquqi məsləhət',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
      link: '/elaqe',
      wide: false,
    },
    {
      title: 'Müqavilə imzala',
      subtitle: 'Şəffaf, təhlükəsiz, peşəkar',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
      link: '/xidmetler',
      wide: true,
    },
    {
      title: 'Korporativ hüquq',
      subtitle: 'Biznesinizin hüquqi tərəfdaşı',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
      link: '/xidmetler',
      wide: false,
    },
  ];

  readonly serviceSteps = [
    { title: 'Sürətli hüquqi dəstək', icon: '⚡' },
    { title: 'Hüquqi plan yarat', icon: '📋' },
    { title: 'Nəticə əldə et', icon: '📈' },
  ];

  constructor(
    private firmServices: FirmServicesService,
    private lawyerService: LawyerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firmServices.list().subscribe({
      next: (items) => (this.services = items.slice(0, 3)),
      error: () => (this.services = []),
    });
    this.lawyerService.list().subscribe({
      next: (items) => (this.lawyers = items.slice(0, 3)),
      error: () => (this.lawyers = []),
    });
  }

  scrollDown(): void {
    window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' });
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
