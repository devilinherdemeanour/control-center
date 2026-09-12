import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AboutService } from '../../../core/services/about.service';

@Component({
  selector: 'app-about-editor',
  templateUrl: './about-editor.component.html',
  styleUrls: ['./about-editor.component.scss'],
})
export class AboutEditorComponent implements OnInit {
  loading = true;
  saving = false;
  error = '';
  success = '';

  form = this.fb.group({
    headline: [''],
    subheadline: [''],
    body: [''],
    mission: [''],
    vision: [''],
    teamIntro: [''],
  });

  constructor(private fb: FormBuilder, private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.get().subscribe({
      next: (about) => {
        this.form.patchValue(about);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load about content.';
        this.loading = false;
      },
    });
  }

  submit(): void {
    this.saving = true;
    this.error = '';
    this.success = '';
    this.aboutService.update(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.saving = false;
        this.success = 'About page saved to about.json.';
      },
      error: () => {
        this.saving = false;
        this.error = 'Could not save about content.';
      },
    });
  }
}
