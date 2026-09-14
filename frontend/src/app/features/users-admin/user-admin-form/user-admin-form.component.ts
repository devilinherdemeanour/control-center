import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import { AdminUser } from '../../../core/models/content.models';

@Component({
  selector: 'app-user-admin-form',
  templateUrl: './user-admin-form.component.html',
  styleUrls: ['./user-admin-form.component.scss'],
})
export class UserAdminFormComponent implements OnInit {
  id: string | null = null;
  loading = false;
  saving = false;
  error = '';
  success = '';
  submitted = false;

  form = this.fb.group({
    username: ['', Validators.required],
    password: [''],
    fullName: [''],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.usersService.list().subscribe({
        next: (users) => {
          const user = users.find((row) => row.id === this.id);
          if (user) {
            this.form.patchValue({
              username: user.username,
              fullName: user.fullName || '',
            });
          } else {
            this.error = 'İstifadəçi tapılmadı.';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'İstifadəçi yüklənmədi.';
          this.loading = false;
        },
      });
    } else {
      this.form.controls.password.setValidators([Validators.required, Validators.minLength(4)]);
      this.form.controls.password.updateValueAndValidity();
    }
  }

  get isEdit(): boolean {
    return !!this.id;
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
      this.error = this.isEdit
        ? 'Zəruri sahələri doldurun (istifadəçi adı).'
        : 'Zəruri sahələri doldurun (istifadəçi adı və şifrə).';
      return;
    }

    if (this.saving) {
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Partial<AdminUser> = {
      username: (raw.username || '').trim(),
      fullName: (raw.fullName || '').trim(),
      role: 'admin',
    };

    const password = (raw.password || '').trim();
    if (password) {
      payload.password = password;
    } else if (!this.isEdit) {
      this.error = 'Yeni istifadəçi üçün şifrə tələb olunur.';
      return;
    }

    this.saving = true;

    const request$ = this.id
      ? this.usersService.update(this.id, payload)
      : this.usersService.create(payload);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.success = this.isEdit ? 'İstifadəçi yeniləndi.' : 'İstifadəçi yaradıldı.';
        setTimeout(() => this.router.navigate(['/admin/istifadeciler']), 500);
      },
      error: (err) => {
        this.saving = false;
        this.error =
          (err && err.error && err.error.error) ||
          'İstifadəçi saxlanılmadı. API-nin işlədiyini yoxlayın.';
      },
    });
  }
}
