import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { mockStores, mockRatings } from "@/utils/mockData";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "sonner";

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  storeId: string | null;
  currentRating?: number;
}

export const RatingDialog: React.FC<RatingDialogProps> = ({
  isOpen,
  onClose,
  storeId,
  currentRating
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(currentRating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const store = storeId ? mockStores.find(s => s.id === storeId) : null;

  useEffect(() => {
    if (isOpen) {
      setRating(currentRating || 0);
      setHoveredRating(0);
    }
  }, [isOpen, currentRating]);

  const handleSubmit = async () => {
    if (!storeId || !user || rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsLoading(true);

    try {
      const existingRatingIndex = mockRatings.findIndex(
        r => r.storeId === storeId && r.userId === user.id
      );

      if (existingRatingIndex !== -1) {
        // Update existing rating
        mockRatings[existingRatingIndex] = {
          ...mockRatings[existingRatingIndex],
          rating,
          createdAt: new Date().toISOString().split('T')[0]
        };
        toast.success("Rating updated successfully!");
      } else {
        // Add new rating
        const newRating = {
          id: Date.now().toString(),
          userId: user.id,
          storeId,
          rating,
          createdAt: new Date().toISOString().split('T')[0]
        };
        mockRatings.push(newRating);
        toast.success("Rating submitted successfully!");
      }

      // Update store's average rating
      const storeRatings = mockRatings.filter(r => r.storeId === storeId);
      const avgRating = storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length;
      
      const storeIndex = mockStores.findIndex(s => s.id === storeId);
      if (storeIndex !== -1) {
        mockStores[storeIndex].avgRating = avgRating;
        mockStores[storeIndex].totalRatings = storeRatings.length;
      }

      onClose();
    } catch (error) {
      toast.error("Failed to submit rating");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isActive = starValue <= (hoveredRating || rating);
      
      return (
        <button
          key={i}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className="p-1 hover:scale-110 transition-transform"
        >
          <Star
            className={`h-8 w-8 ${
              isActive ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentRating ? "Update Rating" : "Rate Store"}
          </DialogTitle>
        </DialogHeader>
        
        {store && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg">{store.name}</h3>
              <p className="text-sm text-muted-foreground">{store.address}</p>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                How would you rate your experience?
              </p>
              
              <div className="flex justify-center gap-1">
                {renderStars()}
              </div>
              
              {(hoveredRating || rating) > 0 && (
                <p className="text-sm font-medium">
                  {hoveredRating || rating} out of 5 stars
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1"
                disabled={rating === 0 || isLoading}
              >
                {isLoading ? "Submitting..." : currentRating ? "Update" : "Submit"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};