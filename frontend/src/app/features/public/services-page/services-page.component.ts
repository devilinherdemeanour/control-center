import { Component, OnInit } from '@angular/core';
import { FirmService } from '../../../core/models/content.models';
import { FirmServicesService } from '../../../core/services/firm-services.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss'],
})
export class ServicesPageComponent implements OnInit {
  services: FirmService[] = [];
  loading = true;

  constructor(private firmServices: FirmServicesService) {}

  ngOnInit(): void {
    this.firmServices.list().subscribe({
      next: (items) => {
        this.services = items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
