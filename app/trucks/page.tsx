"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import SearchFilters from '@/components/trucks/search-filters';
import TruckListItem from '@/components/trucks/truck-list-item';
import { foodTrucks } from '@/lib/dummy-data';
import { filterFoodTrucks } from '@/lib/utils';

export default function TrucksPage() {
  const [filteredTrucks, setFilteredTrucks] = useState(foodTrucks);
  
  const handleSearch = (query: string, filters: { cuisine?: string; isOpen?: boolean }) => {
    const results = filterFoodTrucks(foodTrucks, query, filters);
    setFilteredTrucks(results);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Food Trucks</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Discover and explore food trucks across Australia
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <SearchFilters onSearch={handleSearch} />
          </div>
          
          <div className="md:col-span-3">
            <div className="mb-4 flex justify-between">
              <p>
                <span className="font-medium">{filteredTrucks.length}</span> food trucks found
              </p>
            </div>
            
            <div className="space-y-6">
              {filteredTrucks.length > 0 ? (
                filteredTrucks.map(truck => (
                  <TruckListItem key={truck.id} truck={truck} />
                ))
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mb-2 text-lg font-medium">No food trucks found</h3>
                  <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}