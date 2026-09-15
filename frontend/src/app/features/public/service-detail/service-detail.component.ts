import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirmService } from '../../../core/models/content.models';
import { FirmServicesService } from '../../../core/services/firm-services.service';
import { toDisplayHtml } from '../../../shared/rich-text';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit {
  service: FirmService | null = null;
  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private firmServices: FirmServicesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.firmServices.get(id).subscribe({
      next: (item) => {
        this.service = item;
        this.loading = false;
      },
      error: () => {
        this.notFound = true;
        this.loading = false;
      },
    });
  }

  get formattedContent(): string {
    return toDisplayHtml(this.service?.content);
  }
}
