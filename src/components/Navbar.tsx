
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, User, Home, Video, Music, BookOpen } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
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

  const navLinks = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/video", label: "Video", icon: Video },
    { path: "/audio", label: "Audio", icon: Music },
    { path: "/hadith", label: "Hadits", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="glass border-b border-white/20 dark:border-white/10 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <span className="bg-gradient-to-r from-daarul-primary to-daarul-accent bg-clip-text text-transparent">
              DAARUL ILMI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          )}
          
          {/* Search Bar */}
          <div className={`${isMobile && isSearchOpen ? "absolute inset-x-0 top-0 p-4 glass" : "relative"} flex-1 max-w-md mx-4 ${isMobile ? (isSearchOpen ? "flex" : "hidden") : "flex"}`}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Cari kajian..."
                className="w-full rounded-full border border-input bg-white/60 dark:bg-black/60 backdrop-blur-sm px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {isMobile && isSearchOpen && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1/2 -translate-y-1/2" 
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
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
        </div>
        
        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="absolute inset-x-0 top-[100%] z-50 glass animate-fade-in-down border-b border-white/10">
            <div className="container py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 py-2 text-base ${
                    location.pathname === link.path
                      ? "text-primary font-medium"
                      : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {user ? (
                <div className="pt-2 border-t border-white/10 flex flex-col space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Profil Saya</span>
                  </Link>
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="justify-start px-0 hover:bg-transparent"
                  >
                    Keluar
                  </Button>
                </div>
              ) : (
                <div className="pt-2 border-t border-white/10 flex space-x-2">
                  <Button asChild className="flex-1">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Masuk
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      Daftar
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
