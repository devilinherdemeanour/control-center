import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmServicesService } from '../../../core/services/firm-services.service';
import { FirmService } from '../../../core/models/content.models';
import { richTextEditorConfig } from '../../../shared/rich-text';

@Component({
  selector: 'app-service-admin-form',
  templateUrl: './service-admin-form.component.html',
  styleUrls: ['./service-admin-form.component.scss'],
})
export class ServiceAdminFormComponent implements OnInit {
  id: string | null = null;
  loading = false;
  saving = false;
  error = '';
  success = '';
  submitted = false;
  readonly editorConfig = richTextEditorConfig;

  form = this.fb.group({
    title: ['', Validators.required],
    summary: [''],
    content: ['', Validators.required],
    coverImage: [''],
    icon: [''],
    order: [null as number | null],
    status: ['draft'],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private firmServicesService: FirmServicesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.firmServicesService.get(this.id).subscribe({
        next: (item) => {
          this.form.patchValue({
            title: item.title,
            summary: item.summary,
            content: item.content,
            coverImage: item.coverImage,
            icon: item.icon || '',
            order: item.order ?? null,
            status: item.status,
          });
          this.loading = false;
        },
        error: () => {
          this.error = 'Xidmət tapılmadı.';
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
      this.error = 'Zəruri sahələri doldurun (ad).';
      return;
    }

    if (this.saving) {
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Partial<FirmService> = {
      title: (raw.title || '').trim(),
      summary: raw.summary || '',
      content: raw.content || '',
      coverImage: raw.coverImage || '',
      icon: raw.icon || '',
      order: raw.order != null ? Number(raw.order) : undefined,
      status: raw.status === 'published' ? 'published' : 'draft',
    };

    this.saving = true;

    const request$ = this.id
      ? this.firmServicesService.update(this.id, payload)
      : this.firmServicesService.create(payload);

    request$.subscribe({
      next: (saved) => {
        this.saving = false;
        this.success = this.id
          ? `Xidmət yeniləndi (${saved.status}).`
          : `Xidmət yaradıldı (${saved.status}).`;
        setTimeout(() => this.router.navigate(['/admin/xidmetler']), 500);
      },
      error: (err) => {
        this.saving = false;
        this.error =
          (err && err.error && err.error.error) ||
          'Xidmət saxlanılmadı. API-nin işlədiyini yoxlayın.';
      },
    });
  }
}
