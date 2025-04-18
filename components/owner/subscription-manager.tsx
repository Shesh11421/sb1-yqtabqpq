import { Check, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dummyOwnerProfile } from '@/lib/dummy-data';

const SubscriptionManager = () => {
  const { subscription, subscriptionFeatures } = dummyOwnerProfile;
  
  const plans = [
    {
      name: 'Basic',
      price: 9.99,
      billing: 'monthly',
      description: 'Perfect for getting started',
      features: [
        'Profile Management',
        'Menu Management',
        'Location Updates',
        'Basic Feedback Management',
      ],
      limitations: [
        'Limited Analytics',
        'No Custom Branding',
        'Standard Support',
      ],
    },
    {
      name: 'Premium',
      price: 29.99,
      billing: 'monthly',
      description: 'For food trucks growing their business',
      features: [
        'All Basic Features',
        'Advanced Analytics',
        'Custom Branding',
        'Priority Listing in Search',
        'Email Marketing Tools',
        'Priority Support',
        'Social Media Integration',
      ],
      limitations: [],
      popular: true,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>Your current plan and benefits</CardDescription>
            </div>
            <Badge variant={subscription === 'Premium' ? 'default' : 'outline'}>
              {subscription} Plan
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <h4 className="mb-2 font-medium">Your Benefits:</h4>
          <ul className="mb-4 space-y-2">
            {subscriptionFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Your subscription will renew on <span className="font-medium">August 15, 2025</span>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex space-x-2">
            <Button variant="outline">Manage Billing</Button>
            {subscription === 'Basic' && (
              <Button>Upgrade to Premium</Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <div>
        <h3 className="mb-4 text-lg font-medium">Available Plans</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative overflow-hidden ${plan.popular ? 'border-blue-200 shadow-md dark:border-blue-800' : ''}`}>
              {plan.popular && (
                <div className="absolute right-0 top-0">
                  <div className="bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
                    Popular
                  </div>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="ml-1 text-gray-600 dark:text-gray-400">/{plan.billing}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <h4 className="mb-2 font-medium">Features:</h4>
                <ul className="mb-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="mb-2 font-medium">Limitations:</h4>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <span className="mr-2">•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
              
              <CardFooter>
                {plan.name === subscription ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  >
                    {plan.name === 'Basic' ? 'Downgrade' : 'Upgrade'} to {plan.name}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;