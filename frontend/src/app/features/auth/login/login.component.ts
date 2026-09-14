import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  saving = false;
  error = '';
  submitted = false;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  submit(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.submitted = true;
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.saving) {
      return;
    }

    const { username, password } = this.form.getRawValue();
    this.saving = true;

    this.authService.login((username || '').trim(), password || '').subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.saving = false;
        this.error =
          (err && err.error && (err.error.error || err.error.message)) ||
          'Giriş uğursuz oldu. İstifadəçi adı və ya şifrə yanlışdır.';
      },
    });
  }
}
