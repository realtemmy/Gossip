// app/context/category-context.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type CategoryContextType = {
    selectedCategory: number;
    searchQuery: string;
    setSelectedCategory: (category: number) => void;
    setSearchQuery: (query: string) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState(1);
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