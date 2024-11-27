import React, { createContext, useContext } from 'react';
import type { Category } from '../types';
import { sampleCategories } from '../data/sampleData';

export const CategoryContext = createContext<Category[]>([]);

interface CategoryProviderProps {
  children: React.ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  return (
    <CategoryContext.Provider value={sampleCategories}>
      {children}
    </CategoryContext.Provider>
  );
}