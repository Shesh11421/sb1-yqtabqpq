"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search, MapPin, ChefHat, User, Heart, TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <TruckIcon className="h-8 w-8 text-blue-600" />
            <span className="hidden text-xl font-bold text-gray-800 dark:text-white sm:inline-block">
              LocalFoodTruck<span className="text-blue-600">.au</span>
            </span>
          </Link>

          {/* Search bar - hidden on mobile, visible on desktop */}
          <div className="hidden md:block md:w-1/3 lg:w-2/5">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for food trucks, cuisines, or locations..."
                className="w-full rounded-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/trucks" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              <span className="flex items-center gap-1">
                <TruckIcon className="h-4 w-4" />
                Trucks
              </span>
            </Link>
            <Link href="/locations" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Locations
              </span>
            </Link>
            <Link href="/cuisines" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              <span className="flex items-center gap-1">
                <ChefHat className="h-4 w-4" />
                Cuisines
              </span>
            </Link>
            <Link href="/favorites" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                Favorites
              </span>
            </Link>
            <Link href="/login">
              <Button variant="brand" size="sm" className="ml-2">
                <User className="mr-1 h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link href="/owner/dashboard">
              <Button variant="outline" size="sm">
                Owner Portal
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link href="/search" className="mr-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search bar - visible only on mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search food trucks, cuisines..."
              className="w-full rounded-full pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="mt-4 space-y-3 border-t border-gray-200 pt-4 md:hidden">
            <Link 
              href="/trucks" 
              className="block py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <TruckIcon className="h-5 w-5" />
                Food Trucks
              </span>
            </Link>
            <Link 
              href="/locations" 
              className="block py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Locations
              </span>
            </Link>
            <Link 
              href="/cuisines" 
              className="block py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Cuisines
              </span>
            </Link>
            <Link 
              href="/favorites" 
              className="block py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Favorites
              </span>
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="brand" className="mt-2 w-full">
                <User className="mr-2 h-5 w-5" />
                Login
              </Button>
            </Link>
            <Link href="/owner/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Owner Portal
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;