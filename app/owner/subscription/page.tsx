"use client";

import Sidebar from '@/components/owner/sidebar';
import SubscriptionManager from '@/components/owner/subscription-manager';

export default function OwnerSubscriptionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Subscription Management</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Manage your subscription plan and billing details
            </p>
          </div>
          
          <SubscriptionManager />
        </div>
      </div>
    </div>
  );
}