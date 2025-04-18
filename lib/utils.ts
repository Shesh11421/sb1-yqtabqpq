import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type FoodTruck } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(value);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

export function getCurrentDaySchedule(schedule: FoodTruck['schedule']): { day: string; open: string; close: string } | undefined {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return schedule.find(day => day.day === today);
}

export function isOpenNow(foodTruck: FoodTruck): boolean {
  const schedule = getCurrentDaySchedule(foodTruck.schedule);
  
  if (!schedule || schedule.open === 'Closed') return false;
  
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;
  
  const [openHours, openMinutes] = schedule.open.split(':').map(Number);
  const openTime = openHours * 60 + openMinutes;
  
  const [closeHours, closeMinutes] = schedule.close.split(':').map(Number);
  const closeTime = closeHours * 60 + closeMinutes;
  
  return currentTime >= openTime && currentTime < closeTime;
}

export function generateRatingStars(rating: number): { full: number; half: number; empty: number } {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars
  };
}

export function filterFoodTrucks(
  trucks: FoodTruck[],
  searchQuery: string,
  filters: { cuisine?: string; isOpen?: boolean; }
): FoodTruck[] {
  return trucks.filter(truck => {
    // Search query filter
    if (searchQuery && !matchesSearchQuery(truck, searchQuery)) {
      return false;
    }
    
    // Cuisine filter
    if (filters.cuisine && truck.cuisine !== filters.cuisine) {
      return false;
    }
    
    // Open now filter
    if (filters.isOpen && !truck.isOpen) {
      return false;
    }
    
    return true;
  });
}

function matchesSearchQuery(truck: FoodTruck, query: string): boolean {
  const lowerQuery = query.toLowerCase();
  
  // Check truck name
  if (truck.name.toLowerCase().includes(lowerQuery)) {
    return true;
  }
  
  // Check cuisine
  if (truck.cuisine.toLowerCase().includes(lowerQuery)) {
    return true;
  }
  
  // Check location
  if (truck.location.text.toLowerCase().includes(lowerQuery)) {
    return true;
  }
  
  // Check menu items
  const hasMatchingMenuItem = truck.menu.some(item => 
    item.name.toLowerCase().includes(lowerQuery) || 
    item.description.toLowerCase().includes(lowerQuery)
  );
  
  return hasMatchingMenuItem;
}