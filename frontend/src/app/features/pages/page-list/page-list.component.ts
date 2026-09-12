import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../core/services/page.service';
import { Page } from '../../../core/models/content.models';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit {
  pages: Page[] = [];
  loading = true;
  error = '';
  deletingId = '';

  constructor(private pageService: PageService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.pageService.getAll().subscribe({
      next: (pages) => {
        this.pages = pages;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load pages.';
        this.loading = false;
      },
    });
  }

  remove(page: Page): void {
    if (!page.id || !confirm(`Delete “${page.title}”?`)) {
      return;
    }
    this.deletingId = page.id;
    this.pageService.delete(page.id).subscribe({
      next: () => {
        this.pages = this.pages.filter((item) => item.id !== page.id);
        this.deletingId = '';
      },
      error: () => {
        this.error = 'Could not delete page.';
        this.deletingId = '';
      },
    });
  }
}
