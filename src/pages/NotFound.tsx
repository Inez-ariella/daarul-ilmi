
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md px-4 py-10 glass-card rounded-xl animate-fade-in-up">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-xl text-muted-foreground">Halaman tidak ditemukan</p>
          <p className="text-muted-foreground">Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.</p>
          <Button size="lg" asChild className="mt-4">
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
