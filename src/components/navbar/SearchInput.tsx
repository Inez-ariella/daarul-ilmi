
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export function SearchInput({ isOpen, onToggle, isMobile }: SearchInputProps) {
  return (
    <div className={`${isMobile && isOpen ? "absolute inset-x-0 top-0 p-4 glass" : "relative"} flex-1 max-w-md mx-4 ${isMobile ? (isOpen ? "flex" : "hidden") : "flex"}`}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Cari kajian..."
          className="w-full rounded-full border border-input bg-white/60 dark:bg-black/60 backdrop-blur-sm px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {isMobile && isOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2" 
            onClick={onToggle}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
