"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { foodTrucks } from '@/lib/dummy-data';
// Import Cuisine properly or define it if missing
// If Cuisine is not properly defined in @/lib/types, let's define it here
// This is the likely issue - either the import is incorrect or Cuisine is not defined

// Define Cuisine enum if it doesn't exist in imported file
enum Cuisine {
  American = "American",
  Mexican = "Mexican",
  Italian = "Italian",
  Asian = "Asian",
  Mediterranean = "Mediterranean",
  Indian = "Indian",
  MiddleEastern = "Middle Eastern",
  Dessert = "Dessert",
  Breakfast = "Breakfast",
  Other = "Other"
}

const ProfileForm = () => {
  const truck = foodTrucks[0]; // Using the first truck as dummy data
  
  const [formData, setFormData] = useState({
    name: truck.name,
    description: truck.description,
    cuisine: truck.cuisine,
    phone: truck.contact.phone,
    email: truck.contact.email,
    instagram: truck.contact.instagram || '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="grid gap-6 md:grid-cols-3">
      {/* Truck Image Upload */}
      <div className="md:col-span-1">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium">Food Truck Image</h3>
          
          <div className="relative mx-auto mb-4 h-48 w-full overflow-hidden rounded-lg border border-dashed">
            <Image
              src={truck.image}
              alt={truck.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
              <button className="rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white">
                <Camera className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="sm" className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Change Image
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              Recommended: 1200x800px, max 5MB
            </p>
          </div>
        </div>
      </div>
      
      {/* Profile Form */}
      <div className="rounded-lg border bg-card p-6 shadow-sm md:col-span-2">
        <h3 className="mb-4 text-lg font-medium">Food Truck Information</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Truck Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="cuisine" className="mb-1 block text-sm font-medium">
              Cuisine Type
            </label>
            <select
              id="cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            >
              <option value="" disabled>Select cuisine type</option>
              {Object.values(Cuisine).map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="0400 000 000"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="instagram" className="mb-1 block text-sm font-medium">
              Instagram Handle
            </label>
            <Input
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@yourtruck"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
            
            {isSuccess && (
              <span className="flex items-center text-sm text-green-600">
                <Check className="mr-1 h-4 w-4" />
                Profile updated successfully!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;