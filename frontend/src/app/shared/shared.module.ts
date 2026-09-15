import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, AngularEditorModule],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
  ],
})
export class SharedModule {}
