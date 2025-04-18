import Image from 'next/image';
import { Star } from 'lucide-react';
import { reviews, foodTrucks } from '@/lib/dummy-data';
import { formatDate, generateRatingStars } from '@/lib/utils';

const ReviewItem = ({ review }: { review: any }) => {
  const truck = foodTrucks.find(t => t.id === review.truckId);
  const stars = generateRatingStars(review.rating);
  
  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {review.userImage ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image 
                src={review.userImage} 
                alt={review.username} 
                fill 
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              {review.username.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium">{review.username}</p>
            <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(stars.full)].map((_, i) => (
            <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          {[...Array(stars.half)].map((_, i) => (
            <Star key={`half-${i}`} className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
          ))}
          {[...Array(stars.empty)].map((_, i) => (
            <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
          ))}
        </div>
      </div>
      
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {truck?.name}
        </h4>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
      </div>
      
      {review.reply && (
        <div className="mt-3 rounded-md bg-gray-50 p-3 dark:bg-gray-700/50">
          <p className="mb-1 text-xs font-medium">Owner reply:</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{review.reply.text}</p>
          <p className="mt-1 text-xs text-gray-500">{formatDate(review.reply.date)}</p>
        </div>
      )}
    </div>
  );
};

const ReviewsSection = () => {
  // Get the top 3 latest reviews
  const latestReviews = [...reviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white sm:text-3xl">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Recent reviews from food truck lovers
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;