import React from 'react';
import { Copy, Pencil, Trash2, Download } from 'lucide-react';
import type { Prompt } from '../types';
import { useCategoryColor } from '../hooks/useCategoryColor';
import { convertSinglePromptToCSV, downloadCSV } from '../utils/csvExport';

interface PromptCardProps {
  prompt: Prompt;
  onEdit: () => void;
  onDelete: () => void;
}

export function PromptCard({ prompt, onEdit, onDelete }: PromptCardProps) {
  const categoryColor = useCategoryColor(prompt.category);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
  };

  const handleExport = () => {
    const csvContent = convertSinglePromptToCSV(prompt);
    const date = new Date().toLocaleDateString('ja-JP').replace(/\//g, '');
    downloadCSV(csvContent, `prompt_${prompt.title}_${date}.csv`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ backgroundColor: categoryColor }}
      />
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{prompt.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="コピー"
            >
              <Copy className="h-5 w-5 text-gray-500" />
            </button>
            <button
              onClick={handleExport}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="CSVダウンロード"
            >
              <Download className="h-5 w-5 text-gray-500" />
            </button>
            <button
              onClick={onEdit}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="編集"
            >
              <Pencil className="h-5 w-5 text-gray-500" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-500 hover:text-red-600"
              title="削除"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{prompt.content}</p>
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}