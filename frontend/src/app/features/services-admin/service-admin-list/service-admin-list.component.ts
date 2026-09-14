import { Component, OnInit } from '@angular/core';
import { FirmServicesService } from '../../../core/services/firm-services.service';
import { FirmService } from '../../../core/models/content.models';

@Component({
  selector: 'app-service-admin-list',
  templateUrl: './service-admin-list.component.html',
  styleUrls: ['./service-admin-list.component.scss'],
})
export class ServiceAdminListComponent implements OnInit {
  services: FirmService[] = [];
  loading = true;
  error = '';
  deletingId = '';

  constructor(private firmServicesService: FirmServicesService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.firmServicesService.list(true).subscribe({
      next: (items) => {
        this.services = items;
        this.loading = false;
      },
      error: () => {
        this.error = 'Xidmətlər yüklənmədi.';
        this.loading = false;
      },
    });
  }

  remove(item: FirmService): void {
    if (!item.id || !confirm(`"${item.title}" silinsin?`)) {
      return;
    }
    this.deletingId = item.id;
    this.firmServicesService.delete(item.id).subscribe({
      next: () => {
        this.services = this.services.filter((row) => row.id !== item.id);
        this.deletingId = '';
      },
      error: () => {
        this.error = 'Xidmət silinmədi.';
        this.deletingId = '';
      },
    });
  }
}
