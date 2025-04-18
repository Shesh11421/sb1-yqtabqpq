import MainLayout from '@/components/layout/main-layout';
import TruckDetailHeader from '@/components/trucks/truck-detail-header';
import MenuSection from '@/components/trucks/menu-section';
import ReviewsSection from '@/components/trucks/reviews-section';
import LocationMap from '@/components/trucks/location-map';
import { foodTrucks } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return foodTrucks.map((truck) => ({
    id: truck.id,
  }));
};

export default function TruckDetailPage({ params }: { params: { id: string } }) {
  const truck = foodTrucks.find(t => t.id === params.id);
  
  if (!truck) {
    notFound();
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pb-16 pt-6 md:px-6">
        <TruckDetailHeader truck={truck} />
        
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MenuSection menu={truck.menu} />
            <div className="mt-8">
              <ReviewsSection truckId={truck.id} />
            </div>
          </div>
          
          <div>
            <LocationMap truck={truck} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}