"use client";

import Sidebar from '@/components/owner/sidebar';
import MenuManager from '@/components/owner/menu-manager';

export default function OwnerMenuPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Menu Management</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Add, edit, or remove menu items for your food truck
            </p>
          </div>
          
          <MenuManager />
        </div>
      </div>
    </div>
  );
}