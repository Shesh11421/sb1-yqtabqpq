"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Clock, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, truncateText } from '@/lib/utils';
import { type FoodTruck } from '@/lib/types';

interface TruckListItemProps {
  truck: FoodTruck;
}

const TruckListItem = ({ truck }: TruckListItemProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <Card className="overflow-hidden hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 w-full md:h-auto md:w-1/3">
          <Image
            src={truck.image}
            alt={truck.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <button 
            onClick={toggleFavorite}
            className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-700 shadow-md transition-colors hover:bg-gray-100"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
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

        <div className="flex flex-1 flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{truck.name}</CardTitle>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{truck.rating}</span>
                <span className="ml-1 text-xs text-gray-500">({truck.reviewCount})</span>
              </div>
            </div>
            <CardDescription className="flex items-center">
              <MapPin className="mr-1 h-3 w-3 text-gray-400" />
              {truck.location.text}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="mb-3 text-gray-600 dark:text-gray-300">
              {truncateText(truck.description, 150)}
            </p>
            
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-sm font-medium">Popular Menu Items</h4>
              <button 
                onClick={toggleMenu}
                className="flex items-center text-xs text-blue-600 hover:text-blue-800"
              >
                {isMenuExpanded ? (
                  <>
                    <span>Hide Menu</span>
                    <ChevronUp className="ml-1 h-3 w-3" />
                  </>
                ) : (
                  <>
                    <span>Show Menu</span>
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </>
                )}
              </button>
            </div>
            
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ${isMenuExpanded ? 'max-h-60' : 'max-h-16'}`}>
              {truck.menu.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between text-sm ${index > 1 && !isMenuExpanded ? 'hidden' : ''}`}
                >
                  <div className="flex items-center">
                    <span>{item.name}</span>
                    {item.popular && (
                      <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="font-medium">{formatCurrency(item.price)}</span>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="mt-auto border-t pt-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {truck.isOpen ? (
                  <span>Open now</span>
                ) : (
                  <span>Currently closed</span>
                )}
              </div>
              <Link href={`/trucks/${truck.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default TruckListItem;