import Link from 'next/link';
import { Coffee, Pizza, Beef, Fish, Dessert, Banana, Salad, Utensils } from 'lucide-react';
import { cuisineOptions } from '@/lib/dummy-data';

// Map for cuisine icons
const cuisineIcons: Record<string, React.ReactNode> = {
  Australian: <Beef className="h-8 w-8" />,
  Italian: <Pizza className="h-8 w-8" />,
  Mexican: <Utensils className="h-8 w-8" />,
  Asian: <Salad className="h-8 w-8" />,
  Indian: <Coffee className="h-8 w-8" />,
  Mediterranean: <Fish className="h-8 w-8" />,
  Dessert: <Dessert className="h-8 w-8" />,
  Vegan: <Banana className="h-8 w-8" />,
  Seafood: <Fish className="h-8 w-8" />,
  BBQ: <Beef className="h-8 w-8" />,
};

// Custom color classes for each cuisine
const cuisineColors: Record<string, string> = {
  Australian: 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-800/30',
  Italian: 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-800/30',
  Mexican: 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-800/30',
  Asian: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-800/30',
  Indian: 'bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:hover:bg-orange-800/30',
  Mediterranean: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 dark:bg-cyan-900/20 dark:text-cyan-300 dark:hover:bg-cyan-800/30',
  Dessert: 'bg-pink-50 text-pink-700 hover:bg-pink-100 dark:bg-pink-900/20 dark:text-pink-300 dark:hover:bg-pink-800/30',
  Vegan: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-800/30',
  Seafood: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 dark:hover:bg-indigo-800/30',
  BBQ: 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-800/30',
};

const CuisineCategories = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white sm:text-3xl">
            Browse Food Trucks by Cuisine
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Discover food trucks serving your favorite cuisines
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {cuisineOptions.map((cuisine) => (
            <Link 
              key={cuisine} 
              href={`/cuisines/${cuisine.toLowerCase()}`}
              className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-sm transition-all hover:shadow ${cuisineColors[cuisine]}`}
            >
              <div className="mb-3">
                {cuisineIcons[cuisine]}
              </div>
              <span className="font-medium text-center">{cuisine}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuisineCategories;