import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Category } from '../types';
import { useCategoryColor } from '../hooks/useCategoryColor';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onCreateCategory: (name: string, color: string) => void;
}

export function CategoryList({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  onCreateCategory 
}: CategoryListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#FF6B6B');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onCreateCategory(newCategoryName.trim(), newCategoryColor);
      setNewCategoryName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">カテゴリー</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          title="カテゴリーを追加"
        >
          <Plus className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="カテゴリー名"
            className="w-full mb-2 px-3 py-2 border rounded-lg"
            autoFocus
          />
          <div className="flex items-center mb-2">
            <label className="mr-2 text-sm text-gray-600">色:</label>
            <input
              type="color"
              value={newCategoryColor}
              onChange={(e) => setNewCategoryColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              追加
            </button>
          </div>
        </form>
      )}

      <button
        onClick={() => onCategorySelect(null)}
        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
          selectedCategory === null
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-100'
        }`}
      >
        すべて
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-all relative overflow-hidden ${
            selectedCategory === category.id
              ? 'text-white'
              : 'hover:bg-gray-100'
          }`}
          style={{
            backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
          }}
        >
          <span
            className="inline-block w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: category.color }}
          />
          {category.name}
        </button>
      ))}
    </div>
  );
}