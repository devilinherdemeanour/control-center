import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { NewsItem } from '../../../core/models/content.models';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss'],
})
export class NewsFormComponent implements OnInit {
  id: string | null = null;
  loading = false;
  saving = false;
  error = '';
  success = '';
  submitted = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    shortTitle: [''],
    slug: [''],
    coverImage: [''],
    content: ['', Validators.required],
    status: ['draft'],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.newsService.get(this.id).subscribe({
        next: (item) => {
          this.form.patchValue({
            title: item.title,
            shortTitle: item.shortTitle || '',
            slug: item.slug,
            coverImage: item.coverImage,
            content: item.content,
            status: item.status,
          });
          this.loading = false;
        },
        error: () => {
          this.error = 'Xəbər tapılmadı.';
          this.loading = false;
        },
      });
    }
  }

  get isEdit(): boolean {
    return !!this.id;
  }

  setStatus(status: 'draft' | 'published'): void {
    this.form.patchValue({ status });
  }

  submit(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Zəruri sahələri doldurun (ad və məzmun).';
      return;
    }

    if (this.saving) {
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Partial<NewsItem> = {
      title: (raw.title || '').trim(),
      shortTitle: (raw.shortTitle || '').trim(),
      slug: (raw.slug || '').trim(),
      coverImage: raw.coverImage || '',
      content: raw.content || '',
      status: raw.status === 'published' ? 'published' : 'draft',
    };

    this.saving = true;

    const request$ = this.id
      ? this.newsService.update(this.id, payload)
      : this.newsService.create(payload);

    request$.subscribe({
      next: (saved) => {
        this.saving = false;
        this.success = this.id
          ? `Xəbər yeniləndi (${saved.status}).`
          : `Xəbər yaradıldı (${saved.status}).`;
        setTimeout(() => this.router.navigate(['/admin/xeberler']), 500);
      },
      error: (err) => {
        this.saving = false;
        this.error =
          (err && err.error && err.error.error) ||
          'Xəbər saxlanılmadı. API-nin işlədiyini yoxlayın.';
      },
    });
  }
}
