import { Component, OnInit } from '@angular/core';
import { AboutContent } from '../../../core/models/content.models';
import { AboutService } from '../../../core/services/about.service';
import { toDisplayHtml } from '../../../shared/rich-text';

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
    return toDisplayHtml(this.about?.body);
  }

  get formattedMission(): string {
    return toDisplayHtml(this.about?.mission);
  }

  get formattedVision(): string {
    return toDisplayHtml(this.about?.vision);
  }

  get formattedTeamIntro(): string {
    return toDisplayHtml(this.about?.teamIntro);
  }
}
