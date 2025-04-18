"use client";

import { useState } from 'react';
import { ChefHat, MapPin, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cuisine } from '@/lib/types';
import { cuisineOptions, locationOptions } from '@/lib/dummy-data';

interface SearchFiltersProps {
  onSearch: (query: string, filters: { cuisine?: string; isOpen?: boolean }) => void;
  initialQuery?: string;
  initialCuisine?: string;
  initialIsOpen?: boolean;
}

const SearchFilters = ({ 
  onSearch, 
  initialQuery = '', 
  initialCuisine = '', 
  initialIsOpen = false 
}: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [cuisineFilter, setCuisineFilter] = useState<string>(initialCuisine);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(initialIsOpen);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSearch(searchQuery, {
      cuisine: cuisineFilter || undefined,
      isOpen: isOpenFilter || undefined
    });
  };

  const clearFilters = () => {
    setCuisineFilter('');
    setIsOpenFilter(false);
    
    onSearch(searchQuery, {});
  };

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <form onSubmit={handleSearch}>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search food trucks, cuisines, or menu items..."
            className="pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-1 text-sm"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          >
            {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
          
          <div className="flex gap-2">
            {(cuisineFilter || isOpenFilter) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 text-xs"
              >
                Clear Filters
              </Button>
            )}
            
            <Button type="submit" variant="brand" size="sm" className="h-8">
              Search
            </Button>
          </div>
        </div>

        {isFiltersVisible && (
          <div className="mt-4 grid gap-4 border-t pt-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 flex items-center gap-1 text-sm font-medium">
                <ChefHat className="h-3.5 w-3.5" />
                Cuisine
              </label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={cuisineFilter}
                onChange={(e) => setCuisineFilter(e.target.value)}
              >
                <option value="">All Cuisines</option>
                {cuisineOptions.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 flex items-center gap-1 text-sm font-medium">
                <MapPin className="h-3.5 w-3.5" />
                Location
              </label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">All Locations</option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="openNow"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={isOpenFilter}
                  onChange={(e) => setIsOpenFilter(e.target.checked)}
                />
                <label htmlFor="openNow" className="flex items-center gap-1 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  Open Now
                </label>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilters;