import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../core/services/blog.service';
import { Blog } from '../../../core/models/content.models';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  loading = true;
  error = '';
  deletingId = '';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.blogService.getAll().subscribe({
      next: (blogs) => {
        this.blogs = blogs;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load blogs.';
        this.loading = false;
      },
    });
  }

  remove(blog: Blog): void {
    if (!blog.id || !confirm(`Delete “${blog.title}”?`)) {
      return;
    }
    this.deletingId = blog.id;
    this.blogService.delete(blog.id).subscribe({
      next: () => {
        this.blogs = this.blogs.filter((item) => item.id !== blog.id);
        this.deletingId = '';
      },
      error: () => {
        this.error = 'Could not delete blog.';
        this.deletingId = '';
      },
    });
  }
}
