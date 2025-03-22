
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Video, Music } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden flex items-center">
      {/* Background design */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50 z-0"></div>
      <div className="absolute top-20 -right-32 w-96 h-96 bg-daarul-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-daarul-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left space-y-6 animate-fade-in-up">
            <div className="inline-block px-3 py-1 text-xs font-medium rounded-full glass mb-2">
              DAARUL ILMI
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
              Rumah Digital <span className="bg-gradient-to-r from-daarul-primary to-daarul-accent bg-clip-text text-transparent">Tempatnya Ilmu</span>
            </h1>
            <p className="text-lg text-muted-foreground md:pr-12 text-balance">
              Platform kajian Islam digital untuk meningkatkan aksesibilitas santri dan pengajar terhadap sumber-sumber kajian Islam berupa video, audio, dan hadits.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="rounded-full animate-pulse-slow">
                <Link to="/register">
                  Mulai Belajar
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/video">
                  Jelajahi Konten
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-lg h-80 animate-fade-in">
              {/* Main card */}
              <div className="absolute right-0 top-0 w-64 h-64 glass-card rounded-2xl p-4 shadow-lg hover-scale">
                <div className="w-full h-32 rounded-lg bg-daarul-primary/20 mb-3 flex items-center justify-center">
                  <Video className="w-10 h-10 text-daarul-primary" />
                </div>
                <h3 className="font-semibold">Video Pembelajaran</h3>
                <p className="text-sm text-muted-foreground mt-1">Konten video berkualitas untuk mendalami ilmu Islam</p>
              </div>
              
              {/* Second card */}
              <div className="absolute left-0 top-20 w-56 h-56 glass-card rounded-2xl p-4 shadow-lg hover-scale">
                <div className="w-full h-28 rounded-lg bg-daarul-secondary/20 mb-3 flex items-center justify-center">
                  <Music className="w-8 h-8 text-daarul-secondary" />
                </div>
                <h3 className="font-semibold">Audio Kajian</h3>
                <p className="text-sm text-muted-foreground mt-1">Dengarkan ceramah dan kajian kapan saja</p>
              </div>
              
              {/* Third card */}
              <div className="absolute left-20 bottom-0 w-48 h-48 glass-card rounded-2xl p-4 shadow-lg hover-scale">
                <div className="w-full h-24 rounded-lg bg-daarul-accent/20 mb-3 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-daarul-accent" />
                </div>
                <h3 className="font-semibold">Hadits</h3>
                <p className="text-sm text-muted-foreground mt-1">Koleksi hadits dengan terjemahan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
