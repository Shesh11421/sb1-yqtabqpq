"use client";

import Link from 'next/link';
import { TruckIcon, User, Star, FilePenLine, Menu, Map, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/owner/sidebar';
import DashboardStats from '@/components/owner/dashboard-stats';
import AnalyticsDashboard from '@/components/owner/analytics-dashboard';
import { foodTrucks, dummyOwnerProfile } from '@/lib/dummy-data';

export default function OwnerDashboardPage() {
  const truck = foodTrucks[0]; // Using the first truck as dummy data
  const { subscription } = dummyOwnerProfile;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Welcome back! Here's an overview of your food truck
            </p>
          </div>
          
          <DashboardStats />
          
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Profile Overview */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Food Truck Profile</CardTitle>
                <CardDescription>Quick overview of your truck's information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                    <TruckIcon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-medium">{truck.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{truck.cuisine} Cuisine</p>
                    <div className="mt-1 flex items-center">
                      <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{truck.rating}</span>
                      <span className="ml-1 text-xs text-gray-500">({truck.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Current Location</p>
                    <p className="text-sm font-medium">{truck.location.text}</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Menu Items</p>
                    <p className="text-sm font-medium">{truck.menu.length} items</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/owner/profile" className="w-full">
                  <Button variant="outline" className="w-full">
                    <FilePenLine className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Manage your food truck operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link href="/owner/menu">
                    <Card className="cursor-pointer border hover:border-blue-200 hover:shadow-sm">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-orange-100 p-2 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                          <Menu className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Update Menu</h4>
                          <p className="text-xs text-gray-500">Add or edit menu items</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/owner/location">
                    <Card className="cursor-pointer border hover:border-blue-200 hover:shadow-sm">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-green-100 p-2 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          <Map className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Update Location</h4>
                          <p className="text-xs text-gray-500">Change your truck's location</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/owner/reviews">
                    <Card className="cursor-pointer border hover:border-blue-200 hover:shadow-sm">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-purple-100 p-2 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Manage Reviews</h4>
                          <p className="text-xs text-gray-500">Respond to customer feedback</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/owner/subscription">
                    <Card className="cursor-pointer border hover:border-blue-200 hover:shadow-sm">
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-blue-100 p-2 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Subscription</h4>
                          <p className="text-xs text-gray-500">
                            {subscription === 'Premium' ? 'Manage premium features' : 'Upgrade to premium'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Analytics Overview</h2>
            <AnalyticsDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}