
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedContent } from "@/components/FeaturedContent";
import { SearchBar } from "@/components/SearchBar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-20 bg-white/50 dark:bg-black/50 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-0 h-32"></div>
          <div className="container relative z-10">
            <div className="max-w-xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-center mb-6">Temukan Kajian</h2>
              <SearchBar />
            </div>
            
            <FeaturedContent 
              title="Video Pembelajaran" 
              subtitle="Kumpulan video kajian Islam terbaru"
              contentType="video"
            />
            
            <FeaturedContent 
              title="Audio Kajian" 
              subtitle="Dengarkan ceramah kapan saja"
              contentType="audio"
            />
            
            <FeaturedContent 
              title="Kumpulan Hadits" 
              subtitle="Hadits pilihan dengan terjemahan"
              contentType="hadith"
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
