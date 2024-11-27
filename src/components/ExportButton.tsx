import React from 'react';
import { Download } from 'lucide-react';
import { Prompt } from '../types';
import { convertPromptsToCSV, downloadCSV } from '../utils/csvExport';

interface ExportButtonProps {
  prompts: Prompt[];
}

export function ExportButton({ prompts }: ExportButtonProps) {
  const handleExport = () => {
    const csvContent = convertPromptsToCSV(prompts);
    const date = new Date().toLocaleDateString('ja-JP').replace(/\//g, '');
    downloadCSV(csvContent, `prompts_${date}.csv`);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      title="CSVダウンロード"
    >
      <Download className="h-5 w-5 mr-2" />
      エクスポート
    </button>
  );
}