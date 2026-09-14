import { Component, OnInit } from '@angular/core';
import { NewsItem } from '../../../core/models/content.models';
import { NewsService } from '../../../core/services/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  news: NewsItem[] = [];
  loading = true;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.list().subscribe({
      next: (items) => {
        this.news = items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
