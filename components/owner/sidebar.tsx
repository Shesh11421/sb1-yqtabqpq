"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  TruckIcon, 
  User, 
  Menu as MenuIcon, 
  X, 
  FilePenLine, 
  Map, 
  MessagesSquare, 
  BarChart2, 
  CreditCard, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/owner/dashboard',
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      name: 'Profile',
      href: '/owner/profile',
      icon: <FilePenLine className="h-5 w-5" />,
    },
    {
      name: 'Menu',
      href: '/owner/menu',
      icon: <MenuIcon className="h-5 w-5" />,
    },
    {
      name: 'Location',
      href: '/owner/location',
      icon: <Map className="h-5 w-5" />,
    },
    {
      name: 'Reviews',
      href: '/owner/reviews',
      icon: <MessagesSquare className="h-5 w-5" />,
    },
    {
      name: 'Analytics',
      href: '/owner/analytics',
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      name: 'Subscription',
      href: '/owner/subscription',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: 'Settings',
      href: '/owner/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed right-4 top-4 z-50 block md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMobileMenu}
          className="h-10 w-10 rounded-full bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={closeMobileMenu}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white transition-transform duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-900 md:static md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="border-b px-6 py-4 dark:border-gray-700">
          <Link href="/owner/dashboard" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <TruckIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">
              Owner Portal
            </span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={closeMobileMenu}
              >
                <div
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
        
        {/* User and Logout */}
        <div className="border-t p-4 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Food Truck Owner</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Aussie Bites</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-4 w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
            onClick={closeMobileMenu}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;