
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-white/10 pt-12 pb-6 bg-white/5 backdrop-blur-lg dark:bg-black/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Perpustakaan Digital Al-Muflihun</h3>
            <p className="text-sm text-muted-foreground">
              Platform digital untuk meningkatkan aksesibilitas santri dan pengajar terhadap sumber-sumber kajian keislaman.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link to="/video" className="text-muted-foreground hover:text-primary transition-colors">Video Pembelajaran</Link></li>
              <li><Link to="/audio" className="text-muted-foreground hover:text-primary transition-colors">Audio Kajian</Link></li>
              <li><Link to="/hadith" className="text-muted-foreground hover:text-primary transition-colors">Koleksi Hadits</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pengguna</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">Profil Saya</Link></li>
              <li><Link to="/profile?tab=activity" className="text-muted-foreground hover:text-primary transition-colors">Feedback Saya</Link></li>
              <li><Link to="/profile?tab=activity" className="text-muted-foreground hover:text-primary transition-colors">Rating Saya</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontak</h3>
            <p className="text-sm text-muted-foreground">Pondok Pesantren Al-Muflihun</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:perpustakaan@almuflihun.ac.id" className="hover:text-primary transition-colors">
                perpustakaan@almuflihun.ac.id
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {currentYear} Perpustakaan Digital Pondok Pesantren Al-Muflihun. Hak Cipta Dilindungi.
          </p>
          
          <div className="flex items-center space-x-4">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Ketentuan Layanan
            </Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
