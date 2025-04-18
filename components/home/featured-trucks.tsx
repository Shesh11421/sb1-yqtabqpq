"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, MapPin, Clock, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { foodTrucks } from '@/lib/dummy-data';
import { truncateText, formatCurrency } from '@/lib/utils';

const FeaturedTrucks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Number of cards to show based on screen size
  const getCardsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const [cardsToShow, setCardsToShow] = useState(3);

  // Update cards to show on window resize
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      setCardsToShow(getCardsToShow());
    });
  }

  const totalCards = foodTrucks.length;
  const maxIndex = totalCards - cardsToShow;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white sm:text-3xl">
              Featured Food Trucks
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Discover popular food trucks around Australia
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
          >
            {foodTrucks.map((truck) => (
              <div 
                key={truck.id} 
                className="w-full shrink-0 px-3 md:w-1/2 xl:w-1/3"
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
              >
                <Card className="h-full overflow-hidden hover:border-blue-200">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={truck.image}
                      alt={truck.name}
                      fill
                      className="object-cover transition-transform duration-200 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <button 
                      onClick={() => toggleFavorite(truck.id)}
                      className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-700 shadow-md transition-colors hover:bg-gray-100"
                      aria-label={favorites.includes(truck.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart 
                        className={`h-5 w-5 ${favorites.includes(truck.id) ? "fill-red-500 text-red-500" : ""}`} 
                      />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                      <Badge variant="cuisine" className="font-medium">
                        {truck.cuisine}
                      </Badge>
                      {truck.isOpen ? (
                        <Badge variant="open" className="ml-2 font-medium">
                          Open Now
                        </Badge>
                      ) : (
                        <Badge variant="closed" className="ml-2 font-medium">
                          Closed
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{truck.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{truck.rating}</span>
                        <span className="ml-1 text-xs text-gray-500">({truck.reviewCount})</span>
                      </div>
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-gray-400" />
                      {truck.location.text}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {truncateText(truck.description, 100)}
                    </p>
                    
                    <div className="mt-3">
                      <h4 className="mb-1 text-sm font-medium">Popular Items:</h4>
                      <ul className="space-y-1">
                        {truck.menu
                          .filter(item => item.popular)
                          .slice(0, 2)
                          .map(item => (
                            <li key={item.id} className="flex items-center justify-between text-sm">
                              <span>{item.name}</span>
                              <span className="font-medium">{formatCurrency(item.price)}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        {truck.isOpen ? "Open now" : "Currently closed"}
                      </div>
                      <Link href={`/trucks/${truck.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/trucks">
            <Button variant="outline" className="font-medium">
              View All Food Trucks
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrucks;