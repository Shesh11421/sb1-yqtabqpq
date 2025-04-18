"use client";

import Sidebar from '@/components/owner/sidebar';
import ReviewsManager from '@/components/owner/reviews-manager';

export default function OwnerReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Reviews Management</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Manage and respond to customer reviews and feedback
            </p>
          </div>
          
          <ReviewsManager />
        </div>
      </div>
    </div>
  );
}