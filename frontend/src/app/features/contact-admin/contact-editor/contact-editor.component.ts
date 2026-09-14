import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { ContactInfo } from '../../../core/models/content.models';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.scss'],
})
export class ContactEditorComponent implements OnInit {
  loading = true;
  saving = false;
  error = '';
  success = '';

  form = this.fb.group({
    headline: [''],
    subheadline: [''],
    address: [''],
    phone: [''],
    phoneSecondary: [''],
    email: [''],
    emailSecondary: [''],
    workingHours: [''],
    mapEmbedUrl: [''],
    mapLat: [''],
    mapLng: [''],
    whatsapp: [''],
    telegram: [''],
    facebook: [''],
    instagram: [''],
    linkedin: [''],
    extraNote: [''],
  });

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.get().subscribe({
      next: (contact) => {
        this.form.patchValue(contact);
        this.loading = false;
      },
      error: () => {
        this.error = 'Əlaqə məlumatları yüklənmədi.';
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

    this.contactService.update(this.form.getRawValue() as ContactInfo).subscribe({
      next: () => {
        this.saving = false;
        this.success = 'Əlaqə məlumatları saxlanıldı.';
      },
      error: (err) => {
        this.saving = false;
        this.error =
          (err && err.error && err.error.error) ||
          'Məlumat saxlanılmadı. API-nin işlədiyini yoxlayın.';
      },
    });
  }
}
