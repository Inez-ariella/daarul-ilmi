
import { Link, useLocation } from "react-router-dom";
import { Home, Video, Music, BookOpen } from "lucide-react";

interface NavLink {
  path: string;
  label: string;
  icon: React.ElementType;
}

export function NavLinks({ onClick }: { onClick?: () => void }) {
  const location = useLocation();
  
  const navLinks: NavLink[] = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/video", label: "Video", icon: Video },
    { path: "/audio", label: "Audio", icon: Music },
    { path: "/hadith", label: "Hadits", icon: BookOpen },
  ];

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
            location.pathname === link.path
              ? "text-primary"
              : "text-muted-foreground"
          }`}
          onClick={onClick}
        >
          <link.icon className="h-4 w-4" />
          <span>{link.label}</span>
        </Link>
      ))}
    </>
  );
}
