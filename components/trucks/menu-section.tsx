"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import type { MenuItem } from '@/lib/types';

interface MenuSectionProps {
  menu: MenuItem[];
}

const MenuSection = ({ menu }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Create menu categories
  const categories = [...new Set(menu.map(item => 
    item.dietary?.find(d => d === 'Vegetarian' || d === 'Vegan') || 'Regular'
  ))];

  // Filter menu based on active category
  const filteredMenu = activeCategory
    ? menu.filter(item => 
        item.dietary?.find(d => d === activeCategory) || 
        (activeCategory === 'Regular' && (!item.dietary || !item.dietary.find(d => d === 'Vegetarian' || d === 'Vegan')))
      )
    : menu;

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 md:p-6">
      <h2 className="mb-4 text-xl font-semibold">Menu</h2>
      
      {/* Category filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-1 text-sm transition-colors ${
            activeCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Items
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-1 text-sm transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border p-4 transition-all hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
              {item.image && (
                <div className="relative ml-3 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="font-medium">{formatCurrency(item.price)}</div>
              
              <div className="flex gap-1">
                {item.popular && (
                  <Badge variant="accent" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    Popular
                  </Badge>
                )}
                
                {item.dietary?.map(diet => (
                  <Badge key={diet} variant="dietary">
                    {diet}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;