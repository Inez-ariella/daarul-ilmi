
import { Link } from "react-router-dom";
import { Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  isMobile: boolean;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  toggleSearch: () => void;
  toggleMenu: () => void;
}

export function ActionButtons({ 
  isMobile, 
  isSearchOpen, 
  isMenuOpen, 
  toggleSearch, 
  toggleMenu 
}: ActionButtonsProps) {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Berhasil keluar",
      description: "Anda telah keluar dari akun Anda.",
    });
  };

  return (
    <div className="flex items-center space-x-1">
      {isMobile && !isSearchOpen && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSearch}
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
      
      <ThemeToggle />
      
      {user ? (
        <Button 
          variant="ghost" 
          size="icon" 
          asChild
        >
          <Link to="/profile">
            <User className="h-5 w-5" />
          </Link>
        </Button>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-1 hidden md:inline-flex"
          asChild
        >
          <Link to="/login">
            Masuk
          </Link>
        </Button>
      )}
      
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}
    </div>
  );
}
