"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { reviews as allReviews } from '@/lib/dummy-data';
import { formatDate, generateRatingStars } from '@/lib/utils';
import type { Review } from '@/lib/types';

interface ReviewsSectionProps {
  truckId: string;
}

const ReviewsSection = ({ truckId }: ReviewsSectionProps) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [displayCount, setDisplayCount] = useState(3);
  
  // Filter reviews for this truck
  const truckReviews = allReviews.filter(review => review.truckId === truckId);
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would normally send data to backend
    alert(`Thank you for your ${rating}-star review!`);
    
    // Clear form
    setReviewText('');
    setRating(0);
  };
  
  const showMoreReviews = () => {
    setDisplayCount(prev => prev + 3);
  };

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 md:p-6">
      <h2 className="mb-4 text-xl font-semibold">Reviews & Ratings</h2>
      
      <div className="grid gap-8 md:grid-cols-3">
        {/* Review Summary */}
        <div className="md:col-span-1">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-4xl font-bold">{truckReviews[0]?.rating}</span>
              <span className="text-sm text-gray-500">out of 5</span>
            </div>
            
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={`summary-${i}`} 
                  className={`h-5 w-5 ${i < Math.floor(truckReviews[0]?.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            
            <div className="text-sm text-gray-500">
              Based on {truckReviews.length} reviews
            </div>
          </div>
          
          {/* Write a Review */}
          <div className="mt-6">
            <h3 className="mb-3 font-medium">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium">Your Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={`rating-${star}`}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star 
                        className={`h-6 w-6 ${
                          (hoverRating || rating) >= star 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="review" className="mb-1 block text-sm font-medium">
                  Your Review
                </label>
                <textarea
                  id="review"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Share your experience with this food truck..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                disabled={rating === 0 || !reviewText.trim()}
                className="w-full"
              >
                Submit Review
              </Button>
            </form>
          </div>
        </div>
        
        {/* Reviews List */}
        <div className="space-y-4 md:col-span-2">
          {truckReviews.length > 0 ? (
            <>
              {truckReviews.slice(0, displayCount).map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
              
              {displayCount < truckReviews.length && (
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={showMoreReviews}
                  >
                    <ChevronDown className="mr-1 h-4 w-4" />
                    Show More Reviews
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-dashed p-6 text-center">
              <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewItem = ({ review }: { review: Review }) => {
  const stars = generateRatingStars(review.rating);
  
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
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
      
      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
      
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

export default ReviewsSection;