export type Cuisine = 
  | 'Australian'
  | 'Italian'
  | 'Mexican'
  | 'Asian'
  | 'Indian'
  | 'Mediterranean'
  | 'Dessert'
  | 'Vegan'
  | 'Seafood'
  | 'BBQ';

export type FoodTruck = {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: Cuisine;
  rating: number;
  reviewCount: number;
  menu: MenuItem[];
  location: {
    text: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  schedule: {
    day: string;
    open: string;
    close: string;
  }[];
  contact: {
    phone: string;
    email: string;
    instagram?: string;
  };
  isOpen: boolean;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  popular?: boolean;
  allergens?: string[];
  dietary?: ('Vegetarian' | 'Vegan' | 'Gluten-Free')[];
};

export type Review = {
  id: string;
  truckId: string;
  userId: string;
  username: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
  reply?: {
    text: string;
    date: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  savedTrucks: string[];
  reviews: string[];
};

export type OwnerAnalytics = {
  profileViews: number;
  averageRating: number;
  reviewCount: number;
  topItems: {
    name: string;
    count: number;
  }[];
  ratingsByMonth: {
    month: string;
    rating: number;
  }[];
};

export type SubscriptionTier = 'Basic' | 'Premium';

export type OwnerProfile = {
  id: string;
  userId: string;
  truckId: string;
  subscription: SubscriptionTier;
  subscriptionFeatures: string[];
  analytics: OwnerAnalytics;
};