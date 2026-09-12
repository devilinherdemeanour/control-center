import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-settings-editor',
  templateUrl: './settings-editor.component.html',
  styleUrls: ['./settings-editor.component.scss'],
})
export class SettingsEditorComponent implements OnInit {
  loading = true;
  saving = false;
  error = '';
  success = '';

  form = this.fb.group({
    siteName: [''],
    tagline: [''],
    logoUrl: [''],
    primaryColor: ['#1f4b3a'],
    contactEmail: [''],
    twitter: [''],
    linkedin: [''],
    github: [''],
  });

  constructor(private fb: FormBuilder, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.get().subscribe({
      next: (settings) => {
        this.form.patchValue({
          siteName: settings.siteName,
          tagline: settings.tagline,
          logoUrl: settings.logoUrl,
          primaryColor: settings.primaryColor,
          contactEmail: settings.contactEmail,
          twitter: settings.social?.twitter || '',
          linkedin: settings.social?.linkedin || '',
          github: settings.social?.github || '',
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load settings.';
        this.loading = false;
      },
    });
  }

  submit(): void {
    const raw = this.form.getRawValue();
    this.saving = true;
    this.error = '';
    this.success = '';
    this.settingsService
      .update({
        siteName: raw.siteName || '',
        tagline: raw.tagline || '',
        logoUrl: raw.logoUrl || '',
        primaryColor: raw.primaryColor || '#1f4b3a',
        contactEmail: raw.contactEmail || '',
        social: {
          twitter: raw.twitter || '',
          linkedin: raw.linkedin || '',
          github: raw.github || '',
        },
      })
      .subscribe({
        next: () => {
          this.saving = false;
          this.success = 'Settings saved to settings.json.';
        },
        error: () => {
          this.saving = false;
          this.error = 'Could not save settings.';
        },
      });
  }
}
