"use client";

import Sidebar from '@/components/owner/sidebar';
import AnalyticsDashboard from '@/components/owner/analytics-dashboard';

export default function OwnerAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Track your food truck's performance and customer engagement
            </p>
          </div>
          
          <AnalyticsDashboard />
        </div>
      </div>
    </div>
  );
}