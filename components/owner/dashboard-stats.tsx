import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Eye, 
  MessageSquare, 
  ShoppingBag 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { dummyOwnerProfile } from '@/lib/dummy-data';

const DashboardStats = () => {
  const { analytics } = dummyOwnerProfile;
  
  const stats = [
    {
      title: 'Profile Views',
      value: analytics.profileViews,
      change: +12.3,
      icon: <Eye className="h-5 w-5 text-blue-500" />,
      description: 'Total views in the last 30 days',
    },
    {
      title: 'Average Rating',
      value: analytics.averageRating,
      change: +0.2,
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      description: 'Based on customer reviews',
    },
    {
      title: 'Total Reviews',
      value: analytics.reviewCount,
      change: +8.1,
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      description: 'Customer feedback received',
    },
    {
      title: 'Top Item Orders',
      value: analytics.topItems[0].count,
      change: +5.4,
      icon: <ShoppingBag className="h-5 w-5 text-green-500" />,
      description: `${analytics.topItems[0].name}`,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-900/20">
              {stat.icon}
            </div>
            <CardDescription>
              <div className={`flex items-center space-x-1 ${
                stat.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change > 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(stat.change)}%</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl">
              {typeof stat.value === 'number' && stat.title === 'Average Rating' 
                ? stat.value.toFixed(1) 
                : stat.value}
            </CardTitle>
            <CardDescription className="text-xs">{stat.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;