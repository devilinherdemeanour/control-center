import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../../core/services/page.service';
import { Page } from '../../../core/models/content.models';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss'],
})
export class PageFormComponent implements OnInit {
  id: string | null = null;
  loading = false;
  saving = false;
  error = '';

  form = this.fb.group({
    title: ['', Validators.required],
    slug: [''],
    status: ['draft'],
    seoTitle: [''],
    seoDescription: [''],
    content: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.pageService.getById(this.id).subscribe({
        next: (page) => {
          this.form.patchValue(page);
          this.loading = false;
        },
        error: () => {
          this.error = 'Page not found.';
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
    const payload: Page = {
      title: (raw.title || '').trim(),
      slug: (raw.slug || '').trim(),
      status: raw.status === 'published' ? 'published' : 'draft',
      seoTitle: raw.seoTitle || raw.title || '',
      seoDescription: raw.seoDescription || '',
      content: raw.content || '',
    };

    this.saving = true;
    this.error = '';
    const request$ = this.id
      ? this.pageService.update(this.id, payload)
      : this.pageService.create(payload);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/pages']);
      },
      error: () => {
        this.saving = false;
        this.error = 'Could not save page.';
      },
    });
  }
}
