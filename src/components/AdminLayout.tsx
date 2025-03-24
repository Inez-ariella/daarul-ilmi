
import { FC, ReactNode, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Video, 
  Music, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Menu
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Redirect if not authenticated or not admin
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigationItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/videos", label: "Video", icon: Video },
    { path: "/admin/audios", label: "Audio", icon: Music },
    { path: "/admin/hadiths", label: "Hadits", icon: BookOpen },
    { path: "/admin/users", label: "Pengguna", icon: Users },
    { path: "/admin/settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 z-50 flex flex-col bg-card border-r transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } ${isMobile ? (sidebarOpen ? "left-0" : "-left-16") : "left-0"}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-4 border-b">
          {sidebarOpen ? (
            <Link to="/admin" className="flex items-center space-x-2 font-bold text-xl">
              <span className="bg-gradient-to-r from-daarul-primary to-daarul-accent bg-clip-text text-transparent">
                AL-MUFLIHUN
              </span>
            </Link>
          ) : (
            <div className="w-full flex justify-center">
              <Link to="/admin" className="font-bold text-xl">
                <span className="bg-gradient-to-r from-daarul-primary to-daarul-accent bg-clip-text text-transparent">
                  AM
                </span>
              </Link>
            </div>
          )}
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="ml-auto"
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t p-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className={`w-full flex items-center justify-${sidebarOpen ? "start" : "center"} text-red-500 hover:text-red-700 hover:bg-red-100/50`}
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              {sidebarOpen && <span className="ml-2">Keluar</span>}
            </Button>
            {sidebarOpen && <ThemeToggle />}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? (isMobile ? "ml-0" : "ml-64") : "ml-16"
        }`}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur flex items-center px-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="ml-4 font-medium">
            {navigationItems.find(item => location.pathname === item.path)?.label || "Admin Panel"}
          </div>
          <div className="ml-auto flex items-center space-x-2">
            {!sidebarOpen && <ThemeToggle />}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
