// app/context/category-context.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type CategoryContextType = {
    selectedCategory: string;
    searchQuery: string;
    setSelectedCategory: (category: string) => void;
    setSearchQuery: (query: string) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState('lifestyle');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <CategoryContext.Provider value={{ selectedCategory, searchQuery, setSelectedCategory, setSearchQuery }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategory() {
    const context = useContext(CategoryContext);
    if (!context) throw new Error('useCategory must be used within a CategoryProvider');
    return context;
}