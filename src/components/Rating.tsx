
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RatingProps {
  initialRating?: number;
  totalRatings?: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

export function Rating({
  initialRating = 0,
  totalRatings = 0,
  onRatingChange,
  readOnly = false,
}: RatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleRatingClick = (value: number) => {
    if (readOnly) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login terlebih dahulu untuk memberikan rating.",
        variant: "destructive",
      });
      return;
    }

    setRating(value);
    onRatingChange?.(value);
    
    toast({
      title: "Rating diterima",
      description: `Terima kasih telah memberikan rating ${value} bintang.`
    });
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="flex items-center">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => !readOnly && setHoveredRating(star)}
            onMouseLeave={() => !readOnly && setHoveredRating(0)}
            className={cn(
              "p-1 focus:outline-none transition-transform",
              !readOnly && "hover:scale-110"
            )}
            disabled={readOnly}
          >
            <Star
              className={cn(
                "h-6 w-6 transition-colors",
                (hoveredRating || rating) >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              )}
            />
          </button>
        ))}
      </div>
      
      {totalRatings > 0 && (
        <p className="text-xs text-muted-foreground">
          {rating.toFixed(1)} dari {totalRatings} penilaian
        </p>
      )}
    </div>
  );
}
