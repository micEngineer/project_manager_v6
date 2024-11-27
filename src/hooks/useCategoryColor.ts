import { useMemo } from 'react';
import { useCategories } from './useCategories';

export function useCategoryColor(categoryId: string): string {
  const categories = useCategories();
  
  return useMemo(() => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || '#E5E7EB';
  }, [categories, categoryId]);
}