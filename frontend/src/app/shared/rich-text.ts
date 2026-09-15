import { AngularEditorConfig } from '@kolkov/angular-editor';

export const richTextEditorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '280px',
  minHeight: '180px',
  maxHeight: '560px',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Məzmunu yazın…',
  defaultParagraphSeparator: 'p',
  defaultFontName: '',
  defaultFontSize: '',
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['fontName'],
    ['insertVideo', 'insertImage', 'backgroundColor', 'customClasses', 'link', 'unlink', 'insertHorizontalRule'],
  ],
};

export const richTextEditorCompactConfig: AngularEditorConfig = {
  ...richTextEditorConfig,
  height: '160px',
  minHeight: '120px',
  maxHeight: '320px',
};

/** Render stored content as HTML (supports legacy plain text + new editor HTML). */
export function toDisplayHtml(value: string | null | undefined): string {
  if (!value) {
    return '';
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed;
  }
  return trimmed
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

export function stripHtml(value: string | null | undefined): string {
  if (!value) {
    return '';
  }
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
