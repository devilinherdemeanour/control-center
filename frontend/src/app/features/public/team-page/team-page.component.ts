import { Component, OnInit } from '@angular/core';
import { Lawyer } from '../../../core/models/content.models';
import { LawyerService } from '../../../core/services/lawyer.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit {
  lawyers: Lawyer[] = [];
  loading = true;

  constructor(private lawyerService: LawyerService) {}

  ngOnInit(): void {
    this.lawyerService.list().subscribe({
      next: (items) => {
        this.lawyers = items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
