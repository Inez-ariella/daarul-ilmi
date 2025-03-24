
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { NavLinks } from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function MobileMenu({ isOpen, onClose, onLogout }: MobileMenuProps) {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="absolute inset-x-0 top-[100%] z-50 glass animate-fade-in-down border-b border-white/10">
      <div className="container py-4 space-y-4">
        <NavLinks onClick={onClose} />
        
        {user ? (
          <div className="pt-2 border-t border-white/10 flex flex-col space-y-2">
            <Link
              to="/profile"
              className="flex items-center space-x-2 py-2"
              onClick={onClose}
            >
              <User className="h-4 w-4" />
              <span>Profil Saya</span>
            </Link>
            <Button 
              variant="ghost"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="justify-start px-0 hover:bg-transparent"
            >
              Keluar
            </Button>
          </div>
        ) : (
          <div className="pt-2 border-t border-white/10 flex space-x-2">
            <Button asChild className="flex-1">
              <Link to="/login" onClick={onClose}>
                Masuk
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/register" onClick={onClose}>
                Daftar
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
