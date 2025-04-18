"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChefHat, TruckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cuisineOptions, locationOptions } from '@/lib/dummy-data';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // Filter suggestions based on search query
  const filteredCuisines = cuisineOptions.filter(cuisine => 
    cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);
  
  const filteredLocations = locationOptions.filter(location => 
    location.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-20 text-white md:px-8 md:py-28">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-white"></div>
        <div className="absolute right-1/4 top-3/4 h-64 w-64 rounded-full bg-white"></div>
        <div className="absolute bottom-1/4 left-1/2 h-32 w-32 rounded-full bg-white"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center text-5xl font-bold">
            <TruckIcon className="mr-3 h-12 w-12" />
            <h1>
              Find Food Trucks <span className="block text-yellow-300 md:inline">Near You</span>
            </h1>
          </div>
          
          <p className="mb-8 text-lg text-blue-100 md:text-xl">
            Discover the best food trucks across Australia. 
            Search by cuisine, location, or your favorite food.
          </p>

          <div className="relative mb-8">
            <form onSubmit={handleSearch} className="relative mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for cuisine, location, or food..."
                  className="h-12 w-full border-none bg-white pl-10 pr-4 text-gray-900 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                  onBlur={() => {
                    // Delayed hide to allow for clicks on suggestions
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                />
                <Button type="submit" className="absolute right-0 top-0 h-12 rounded-l-none bg-blue-600 px-6 hover:bg-blue-700">
                  Search
                </Button>
              </div>

              {showSuggestions && (searchQuery.length > 0) && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white py-2 shadow-lg">
                  {filteredCuisines.length > 0 && (
                    <div className="px-3 py-1">
                      <div className="mb-1 flex items-center text-xs font-semibold text-gray-500">
                        <ChefHat className="mr-1 h-3 w-3" />
                        <span>Cuisines</span>
                      </div>
                      {filteredCuisines.map((cuisine) => (
                        <div
                          key={cuisine}
                          className="cursor-pointer px-2 py-1 text-gray-700 hover:bg-blue-50"
                          onMouseDown={() => handleSuggestionClick(cuisine)}
                        >
                          {cuisine}
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredLocations.length > 0 && (
                    <div className="border-t px-3 py-1">
                      <div className="mb-1 flex items-center text-xs font-semibold text-gray-500">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>Locations</span>
                      </div>
                      {filteredLocations.map((location) => (
                        <div
                          key={location}
                          className="cursor-pointer px-2 py-1 text-gray-700 hover:bg-blue-50"
                          onMouseDown={() => handleSuggestionClick(location)}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline" 
              className="border-blue-200 bg-transparent text-blue-200 hover:bg-blue-700 hover:text-white"
              onClick={() => router.push('/cuisines')}
            >
              <ChefHat className="mr-1 h-4 w-4" />
              Browse Cuisines
            </Button>
            <Button
              variant="outline" 
              className="border-blue-200 bg-transparent text-blue-200 hover:bg-blue-700 hover:text-white"
              onClick={() => router.push('/locations')}
            >
              <MapPin className="mr-1 h-4 w-4" />
              Find By Location
            </Button>
            <Button
              variant="outline" 
              className="border-blue-200 bg-transparent text-blue-200 hover:bg-blue-700 hover:text-white"
              onClick={() => router.push('/trucks')}
            >
              <TruckIcon className="mr-1 h-4 w-4" />
              All Food Trucks
            </Button>
          </div>
        </div>
      </div>
      
      {/* Wave bottom */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-[60px] w-full text-white fill-current">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;