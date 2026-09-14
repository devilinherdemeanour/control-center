import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LawyerService } from '../../../core/services/lawyer.service';
import { Lawyer } from '../../../core/models/content.models';

@Component({
  selector: 'app-lawyer-admin-form',
  templateUrl: './lawyer-admin-form.component.html',
  styleUrls: ['./lawyer-admin-form.component.scss'],
})
export class LawyerAdminFormComponent implements OnInit {
  id: string | null = null;
  loading = false;
  saving = false;
  error = '';
  success = '';
  submitted = false;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    direction: [''],
    title: [''],
    photo: [''],
    bio: [''],
    details: [''],
    email: [''],
    phone: [''],
    order: [null as number | null],
    status: ['draft'],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lawyerService: LawyerService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.lawyerService.get(this.id).subscribe({
        next: (item) => {
          this.form.patchValue({
            firstName: item.firstName,
            lastName: item.lastName,
            direction: item.direction,
            title: item.title,
            photo: item.photo,
            bio: item.bio,
            details: item.details,
            email: item.email,
            phone: item.phone,
            order: item.order ?? null,
            status: item.status,
          });
          this.loading = false;
        },
        error: () => {
          this.error = 'Vəkil tapılmadı.';
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
      this.error = 'Zəruri sahələri doldurun (ad və soyad).';
      return;
    }

    if (this.saving) {
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Partial<Lawyer> = {
      firstName: (raw.firstName || '').trim(),
      lastName: (raw.lastName || '').trim(),
      direction: raw.direction || '',
      title: raw.title || '',
      photo: raw.photo || '',
      bio: raw.bio || '',
      details: raw.details || '',
      email: raw.email || '',
      phone: raw.phone || '',
      order: raw.order != null ? Number(raw.order) : undefined,
      status: raw.status === 'published' ? 'published' : 'draft',
    };

    this.saving = true;

    const request$ = this.id
      ? this.lawyerService.update(this.id, payload)
      : this.lawyerService.create(payload);

    request$.subscribe({
      next: (saved) => {
        this.saving = false;
        this.success = this.id
          ? `Vəkil yeniləndi (${saved.status}).`
          : `Vəkil yaradıldı (${saved.status}).`;
        setTimeout(() => this.router.navigate(['/admin/vekiller']), 500);
      },
      error: (err) => {
        this.saving = false;
        this.error =
          (err && err.error && err.error.error) ||
          'Vəkil saxlanılmadı. API-nin işlədiyini yoxlayın.';
      },
    });
  }
}
