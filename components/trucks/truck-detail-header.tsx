"use client";

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Star, Clock, Heart, ChefHat, Phone, Mail, Instagram } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { generateRatingStars } from '@/lib/utils';
import type { FoodTruck } from '@/lib/types';

interface TruckDetailHeaderProps {
  truck: FoodTruck;
}

const TruckDetailHeader = ({ truck }: TruckDetailHeaderProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const stars = generateRatingStars(truck.rating);
  
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl sm:h-64 md:h-80">
        <Image
          src={truck.image}
          alt={truck.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      {/* Truck Info Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">{truck.name}</h1>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            <Heart className={`h-6 w-6 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
        
        <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-4">
          <Badge variant="cuisine" className="text-sm font-medium">
            {truck.cuisine}
          </Badge>
          {truck.isOpen ? (
            <Badge variant="open" className="text-sm font-medium">
              Open Now
            </Badge>
          ) : (
            <Badge variant="closed" className="text-sm font-medium">
              Closed
            </Badge>
          )}
          
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4 text-blue-300" />
            <span>{truck.location.text}</span>
          </div>
          
          <div className="flex items-center">
            {[...Array(stars.full)].map((_, i) => (
              <Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
            {[...Array(stars.half)].map((_, i) => (
              <Star key={`half-${i}`} className="h-5 w-5 fill-yellow-400/50 text-yellow-400" />
            ))}
            {[...Array(stars.empty)].map((_, i) => (
              <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
            ))}
            <span className="ml-1 font-medium">{truck.rating}</span>
            <span className="ml-1 text-sm text-gray-300">({truck.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
      
      {/* Contact and Details */}
      <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 md:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xl font-semibold">About</h2>
            <p className="text-gray-600 dark:text-gray-300">{truck.description}</p>
            
            <div className="mt-4">
              <h3 className="mb-2 font-medium">Specializes in:</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  <ChefHat className="mr-1 h-3 w-3" />
                  {truck.cuisine}
                </div>
                {truck.menu
                  .filter(item => item.popular)
                  .slice(0, 3)
                  .map(item => (
                    <div key={item.id} className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                      {item.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="mb-3 text-xl font-semibold">Contact & Hours</h2>
            <ul className="space-y-3">
              {truck.contact.phone && (
                <li className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-blue-600" />
                  <a href={`tel:${truck.contact.phone}`} className="text-blue-600 hover:underline">
                    {truck.contact.phone}
                  </a>
                </li>
              )}
              
              {truck.contact.email && (
                <li className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-blue-600" />
                  <a href={`mailto:${truck.contact.email}`} className="text-blue-600 hover:underline">
                    {truck.contact.email}
                  </a>
                </li>
              )}
              
              {truck.contact.instagram && (
                <li className="flex items-center">
                  <Instagram className="mr-2 h-4 w-4 text-blue-600" />
                  <a href={`https://instagram.com/${truck.contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {truck.contact.instagram}
                  </a>
                </li>
              )}
            </ul>
            
            <div className="mt-4">
              <h3 className="mb-2 font-medium">Hours:</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {truck.schedule.map((day) => (
                  <div key={day.day} className="flex justify-between">
                    <span className="font-medium">{day.day}</span>
                    <span>
                      {day.open === 'Closed' ? 'Closed' : `${day.open} - ${day.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckDetailHeader;