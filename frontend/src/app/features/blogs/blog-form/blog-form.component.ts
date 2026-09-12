import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { Blog } from '../../../core/models/content.models';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {
  id: string | null = null;
  loading = false;
  saving = false;
  error = '';
  success = '';

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(160)]],
    slug: [''],
    excerpt: [''],
    content: ['', Validators.required],
    author: ['Admin'],
    status: ['draft'],
    tags: [''],
    coverImage: [''],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.blogService.getById(this.id).subscribe({
        next: (blog) => {
          this.form.patchValue({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author,
            status: blog.status,
            tags: (blog.tags || []).join(', '),
            coverImage: blog.coverImage,
          });
          this.loading = false;
        },
        error: () => {
          this.error = 'Blog not found.';
          this.loading = false;
        },
      });
    }
  }

  get isEdit(): boolean {
    return !!this.id;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Blog = {
      title: (raw.title || '').trim(),
      slug: (raw.slug || '').trim(),
      excerpt: raw.excerpt || '',
      content: raw.content || '',
      author: raw.author || 'Admin',
      status: raw.status === 'published' ? 'published' : 'draft',
      tags: (raw.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      coverImage: raw.coverImage || '',
    };

    this.saving = true;
    this.error = '';
    this.success = '';

    const request$ = this.id
      ? this.blogService.update(this.id, payload)
      : this.blogService.create(payload);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.success = this.id ? 'Blog updated.' : 'Blog created.';
        this.router.navigate(['/blogs']);
      },
      error: () => {
        this.saving = false;
        this.error = 'Could not save blog.';
      },
    });
  }
}
