
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./navbar/Logo";
import { NavLinks } from "./navbar/NavLinks";
import { SearchInput } from "./navbar/SearchInput";
import { ActionButtons } from "./navbar/ActionButtons";
import { MobileMenu } from "./navbar/MobileMenu";

export function Navbar() {
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Berhasil keluar",
      description: "Anda telah keluar dari akun Anda.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="glass border-b border-white/20 dark:border-white/10 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks />
            </div>
          )}
          
          {/* Search Bar */}
          <SearchInput 
            isOpen={isSearchOpen} 
            onToggle={toggleSearch} 
            isMobile={isMobile} 
          />
          
          {/* Action Buttons */}
          <ActionButtons 
            isMobile={isMobile}
            isSearchOpen={isSearchOpen}
            isMenuOpen={isMenuOpen}
            toggleSearch={toggleSearch}
            toggleMenu={toggleMenu}
          />
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobile && isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onLogout={handleLogout}
        />
      </nav>
    </header>
  );
}
