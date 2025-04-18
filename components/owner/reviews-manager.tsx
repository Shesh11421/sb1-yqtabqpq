"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, ArrowUpDown, MessageSquare, Check, Loader2 } from 'lucide-react';
import { reviews } from '@/lib/dummy-data';
import { formatDate, generateRatingStars } from '@/lib/utils';

const ReviewsManager = () => {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [submittingReply, setSubmittingReply] = useState<string | null>(null);
  
  // Filter and sort reviews
  const filteredReviews = [...reviews]
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  
  const handleReplyChange = (id: string, value: string) => {
    setReplyText(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmitReply = (id: string) => {
    if (!replyText[id]?.trim()) return;
    
    setSubmittingReply(id);
    
    // Simulate API call
    setTimeout(() => {
      // Clear reply text
      setReplyText(prev => ({ ...prev, [id]: '' }));
      setSubmittingReply(null);
      
      // In a real app, we would update the review with the reply
      alert('Reply submitted successfully!');
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center rounded-md border bg-background px-3 py-1 text-sm">
            <ArrowUpDown className="mr-2 h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {[null, 5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating === null ? 'all' : rating}
                variant={filterRating === rating ? 'default' : 'outline'}
                size="sm"
                className="h-8"
                onClick={() => setFilterRating(rating)}
              >
                {rating === null ? 'All' : (
                  <div className="flex items-center">
                    {rating}
                    <Star className="ml-1 h-3 w-3 fill-current" />
                  </div>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => {
            const stars = generateRatingStars(review.rating);
            
            return (
              <div key={review.id} className="rounded-lg border p-4 shadow-sm">
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
                
                {review.reply ? (
                  <div className="mt-3 rounded-md bg-gray-50 p-3 dark:bg-gray-700/50">
                    <p className="mb-1 text-xs font-medium">Your reply:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{review.reply.text}</p>
                    <p className="mt-1 text-xs text-gray-500">{formatDate(review.reply.date)}</p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <div className="mb-2 flex items-center">
                      <MessageSquare className="mr-1 h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Reply to this review</span>
                    </div>
                    <textarea
                      value={replyText[review.id] || ''}
                      onChange={(e) => handleReplyChange(review.id, e.target.value)}
                      placeholder="Thank you for your feedback..."
                      className="mb-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      rows={2}
                    ></textarea>
                    <Button
                      onClick={() => handleSubmitReply(review.id)}
                      disabled={!replyText[review.id]?.trim() || submittingReply === review.id}
                      size="sm"
                    >
                      {submittingReply === review.id ? (
                        <>
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Check className="mr-1 h-3 w-3" />
                          Submit Reply
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <MessageSquare className="mx-auto mb-3 h-8 w-8 text-gray-400" />
            <h4 className="mb-1 text-lg font-medium">No reviews found</h4>
            <p className="text-gray-500">
              {filterRating ? `No ${filterRating}-star reviews found.` : 'You don\'t have any reviews yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsManager;