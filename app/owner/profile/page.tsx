"use client";

import Sidebar from '@/components/owner/sidebar';
import ProfileForm from '@/components/owner/profile-form';

export default function OwnerProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile Management</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Update your food truck's information and contact details
            </p>
          </div>
          
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}