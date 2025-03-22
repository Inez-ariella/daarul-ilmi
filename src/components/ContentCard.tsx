
import { Link } from "react-router-dom";
import { Clock, Calendar, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  type: "video" | "audio" | "hadith";
  rating: number;
  date: string;
  duration?: string;
}

export function ContentCard({
  id,
  title,
  description,
  image,
  type,
  rating,
  date,
  duration,
}: ContentCardProps) {
  // Determine the link based on content type
  const contentLink = `/${type}/${id}`;

  return (
    <Card className="overflow-hidden hover-scale border-white/20 dark:border-white/10">
      <Link to={contentLink}>
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-medium rounded bg-black/70 text-white flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{duration}</span>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4 text-left">
        <Link to={contentLink}>
          <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
