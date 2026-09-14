import { Component, OnInit } from '@angular/core';
import { AboutContent } from '../../../core/models/content.models';
import { AboutService } from '../../../core/services/about.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  about: AboutContent | null = null;
  loading = true;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.get().subscribe({
      next: (content) => {
        this.about = content;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get formattedBody(): string {
    if (!this.about?.body) return '';
    return this.about.body
      .split('\n\n')
      .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }
}
