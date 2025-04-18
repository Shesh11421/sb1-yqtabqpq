"use client";

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { foodTrucks } from '@/lib/dummy-data';

const LocationUpdater = () => {
  const truck = foodTrucks[0]; // Using the first truck as dummy data
  
  const [location, setLocation] = useState(truck.location.text);
  const [schedule, setSchedule] = useState(truck.schedule);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  
  const handleScheduleChange = (day: string, field: 'open' | 'close', value: string) => {
    setSchedule(prevSchedule => 
      prevSchedule.map(item => 
        item.day === day ? { ...item, [field]: value } : item
      )
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Location Map */}
      <div className="relative rounded-lg border overflow-hidden">
        {/* Map placeholder */}
        <div className="relative h-full min-h-[300px] w-full bg-gray-200">
          <Image
            src="https://images.pexels.com/photos/4383007/pexels-photo-4383007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Map location"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-blue-900/10">
            <div className="text-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <p className="text-lg font-semibold">{location}</p>
              <p className="text-sm text-gray-600">Map integration will be available in Phase 2</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Location Form */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Update Location</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="location" className="mb-1 block text-sm font-medium">
              Current Location
            </label>
            <Input
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="e.g., Bondi Beach, Sydney"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter a detailed location that customers can easily find
            </p>
          </div>
          
          <div className="mb-6">
            <h4 className="mb-3 font-medium">Operating Hours</h4>
            <div className="space-y-3">
              {schedule.map(day => (
                <div key={day.day} className="grid grid-cols-3 gap-2 items-center">
                  <span className="text-sm font-medium">{day.day}</span>
                  <Input
                    type="time"
                    value={day.open === 'Closed' ? '' : day.open}
                    onChange={(e) => handleScheduleChange(day.day, 'open', e.target.value || 'Closed')}
                    className="text-sm"
                  />
                  <Input
                    type="time"
                    value={day.close === 'Closed' ? '' : day.close}
                    onChange={(e) => handleScheduleChange(day.day, 'close', e.target.value || 'Closed')}
                    className="text-sm"
                    disabled={day.open === 'Closed'}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Location & Hours
              </>
            )}
          </Button>
          
          {isSuccess && (
            <p className="mt-3 text-center text-sm text-green-600">
              Location and schedule updated successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LocationUpdater;