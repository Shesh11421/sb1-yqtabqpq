import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FoodTruck } from '@/lib/types';

interface LocationMapProps {
  truck: FoodTruck;
}

const LocationMap = ({ truck }: LocationMapProps) => {
  // In a real app, we would use the coordinates to show a proper map
  // For this phase, we'll use a placeholder image
  
  const openDirections = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(truck.location.text)}`;
    window.open(mapUrl, '_blank');
  };
  
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 md:p-6">
      <h2 className="mb-4 flex items-center text-xl font-semibold">
        <MapPin className="mr-2 h-5 w-5 text-blue-600" />
        Location
      </h2>
      
      <div className="mb-4 overflow-hidden rounded-lg border">
        {/* Map placeholder */}
        <div className="relative h-64 w-full bg-gray-200">
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
              <p className="text-lg font-semibold">{truck.location.text}</p>
              <p className="text-sm text-gray-600">Map view will be available in Phase 2</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button 
          variant="brand"
          className="w-full sm:w-auto"
          onClick={openDirections}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Get Directions
        </Button>
      </div>
    </div>
  );
};

export default LocationMap;