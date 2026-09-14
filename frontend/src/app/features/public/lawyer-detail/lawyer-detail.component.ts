import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lawyer } from '../../../core/models/content.models';
import { LawyerService } from '../../../core/services/lawyer.service';

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
    if (!this.lawyer?.details) return '';
    return this.lawyer.details
      .split('\n\n')
      .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }
}
