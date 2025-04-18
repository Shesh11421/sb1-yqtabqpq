import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TruckIcon, Users } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* For Food Lovers */}
            <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Food Lovers</h3>
              <p className="mb-6 text-white/90">
                Discover unique food trucks in your area. Find your favorite cuisines and save them for later.
              </p>
              <Link href="/trucks">
                <Button className="bg-white text-orange-600 hover:bg-white/90 hover:text-orange-700">
                  Find Food Trucks
                </Button>
              </Link>
            </div>

            {/* For Food Truck Owners */}
            <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <TruckIcon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Food Truck Owners</h3>
              <p className="mb-6 text-white/90">
                Grow your business by reaching more customers. List your food truck and manage your profile easily.
              </p>
              <Link href="/owner/register">
                <Button className="bg-white text-orange-600 hover:bg-white/90 hover:text-orange-700">
                  List Your Truck
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-white/10 p-8 text-center backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Ready to join the food truck revolution?</h2>
            <p className="mx-auto mb-6 max-w-xl text-white/90">
              Whether you're looking for amazing street food or wanting to grow your food truck business,
              LocalFoodTruck.au has you covered.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Link href="/signup">
                <Button className="bg-white text-orange-600 hover:bg-white/90 hover:text-orange-700">
                  Sign Up for Free
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-white bg-transparent text-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;