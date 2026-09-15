import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AboutService } from '../../../core/services/about.service';
import { richTextEditorCompactConfig, richTextEditorConfig } from '../../../shared/rich-text';

@Component({
  selector: 'app-about-editor',
  templateUrl: './about-editor.component.html',
  styleUrls: ['./about-editor.component.scss'],
})
export class AboutEditorComponent implements OnInit {
  @ViewChild('feedback') feedback?: ElementRef<HTMLElement>;

  loading = true;
  saving = false;
  error = '';
  success = '';
  readonly editorConfig = richTextEditorConfig;
  readonly compactEditorConfig = richTextEditorCompactConfig;

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
    if (this.saving) {
      return;
    }

    this.saving = true;
    this.error = '';
    this.success = '';
    this.aboutService.update(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.saving = false;
        this.success = 'About page saved to about.json.';
        setTimeout(() => {
          const el =
            this.feedback?.nativeElement ||
            (document.querySelector('.state.success') as HTMLElement | null);
          el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 0);
      },
      error: (err) => {
        this.saving = false;
        this.error =
          (err && err.error && err.error.error) ||
          'Could not save about content. Check that the API is running on port 4521.';
        setTimeout(() => this.feedback?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
      },
    });
  }
}
