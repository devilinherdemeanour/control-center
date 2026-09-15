import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lawyer } from '../../../core/models/content.models';
import { LawyerService } from '../../../core/services/lawyer.service';
import { toDisplayHtml } from '../../../shared/rich-text';

@Component({
  selector: 'app-lawyer-detail',
  templateUrl: './lawyer-detail.component.html',
  styleUrls: ['./lawyer-detail.component.scss'],
})
export class LawyerDetailComponent implements OnInit {
  lawyer: Lawyer | null = null;
  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private lawyerService: LawyerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.lawyerService.get(id).subscribe({
      next: (item) => {
        this.lawyer = item;
        this.loading = false;
      },
      error: () => {
        this.notFound = true;
        this.loading = false;
      },
    });
  }

  get formattedDetails(): string {
    return toDisplayHtml(this.lawyer?.details);
  }

  get formattedBio(): string {
    return toDisplayHtml(this.lawyer?.bio);
  }
}
