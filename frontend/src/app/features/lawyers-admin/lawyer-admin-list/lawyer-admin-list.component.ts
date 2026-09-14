import { Component, OnInit } from '@angular/core';
import { LawyerService } from '../../../core/services/lawyer.service';
import { Lawyer } from '../../../core/models/content.models';

@Component({
  selector: 'app-lawyer-admin-list',
  templateUrl: './lawyer-admin-list.component.html',
  styleUrls: ['./lawyer-admin-list.component.scss'],
})
export class LawyerAdminListComponent implements OnInit {
  lawyers: Lawyer[] = [];
  loading = true;
  error = '';
  deletingId = '';

  constructor(private lawyerService: LawyerService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.lawyerService.list(true).subscribe({
      next: (items) => {
        this.lawyers = items;
        this.loading = false;
      },
      error: () => {
        this.error = 'Vəkillər yüklənmədi.';
        this.loading = false;
      },
    });
  }

  remove(item: Lawyer): void {
    const name = `${item.firstName} ${item.lastName}`.trim();
    if (!item.id || !confirm(`"${name}" silinsin?`)) {
      return;
    }
    this.deletingId = item.id;
    this.lawyerService.delete(item.id).subscribe({
      next: () => {
        this.lawyers = this.lawyers.filter((row) => row.id !== item.id);
        this.deletingId = '';
      },
      error: () => {
        this.error = 'Vəkil silinmədi.';
        this.deletingId = '';
      },
    });
  }
}
