
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Video, 
  Music, 
  BookOpen, 
  Users, 
  Settings,
  User
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const AdminHeader: FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navigationItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/videos", label: "Video", icon: Video },
    { path: "/admin/audios", label: "Audio", icon: Music },
    { path: "/admin/hadiths", label: "Hadits", icon: BookOpen },
    { path: "/admin/users", label: "Pengguna", icon: Users },
    { path: "/admin/settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === item.path
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user && (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              asChild
            >
              <Link to="/profile">
                <User className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="text-red-500 hover:text-red-700 hover:bg-red-100/50"
            >
              Keluar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
