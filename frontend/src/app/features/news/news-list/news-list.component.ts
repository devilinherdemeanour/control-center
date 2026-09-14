import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../core/services/news.service';
import { NewsItem } from '../../../core/models/content.models';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  news: NewsItem[] = [];
  loading = true;
  error = '';
  deletingId = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.newsService.list(true).subscribe({
      next: (items) => {
        this.news = items;
        this.loading = false;
      },
      error: () => {
        this.error = 'Xəbərlər yüklənmədi.';
        this.loading = false;
      },
    });
  }

  remove(item: NewsItem): void {
    if (!item.id || !confirm(`"${item.title}" silinsin?`)) {
      return;
    }
    this.deletingId = item.id;
    this.newsService.delete(item.id).subscribe({
      next: () => {
        this.news = this.news.filter((row) => row.id !== item.id);
        this.deletingId = '';
      },
      error: () => {
        this.error = 'Xəbər silinmədi.';
        this.deletingId = '';
      },
    });
  }
}
