import { Prompt } from '../types';

export function convertPromptsToCSV(prompts: Prompt[]): string {
  const headers = ['タイトル', 'カテゴリー', '内容', 'タグ', '作成日', '更新日'];
  const rows = prompts.map(prompt => [
    prompt.title,
    prompt.category,
    prompt.content,
    prompt.tags.join(';'),
    prompt.createdAt.toLocaleDateString('ja-JP'),
    prompt.updatedAt.toLocaleDateString('ja-JP')
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    )
  ].join('\n');

  return csvContent;
}

export function convertSinglePromptToCSV(prompt: Prompt): string {
  return convertPromptsToCSV([prompt]);
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}