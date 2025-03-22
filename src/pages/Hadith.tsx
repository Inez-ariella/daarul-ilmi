
import { Navbar } from "@/components/Navbar";
import { Rating } from "@/components/Rating";
import { CommentSection } from "@/components/CommentSection";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ContentCard, ContentCardProps } from "@/components/ContentCard";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock hadith data
const hadithData = {
  id: "1",
  title: "Hadits Arbain: 40 Hadits Pilihan",
  description: "Kumpulan 40 hadits pilihan yang mencakup berbagai aspek penting dalam ajaran Islam. Hadits-hadits ini diseleksi oleh Imam An-Nawawi dan menjadi rujukan penting bagi umat Islam dalam memahami ajaran agama.",
  image: "https://source.unsplash.com/random/800x600/?calligraphy",
  arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
  translation: "Sesungguhnya setiap amalan tergantung pada niatnya. Dan sesungguhnya setiap orang akan mendapatkan apa yang ia niatkan.",
  narrator: "Umar bin Khattab radhiallahu 'anhu",
  source: "HR. Bukhari dan Muslim",
  date: "15 Januari 2023",
  author: "Ustadz Abdullah Hakim",
  views: 1420,
  rating: 5.0,
  totalRatings: 178,
};

// Mock comments
const initialComments = [
  {
    id: "1",
    user: {
      id: "101",
      username: "hafiz_quran",
      avatar: "https://source.unsplash.com/random/100x100/?man2",
    },
    content: "Syukron untuk penyajian hadits yang sangat jelas beserta penjelasan makna yang mudah dipahami.",
    date: "20 Januari 2023",
  },
  {
    id: "2",
    user: {
      id: "102",
      username: "ummu_hasan",
      avatar: "https://source.unsplash.com/random/100x100/?woman2",
    },
    content: "Alhamdulillah, hadits ini selalu mengingatkan saya untuk memperbaiki niat dalam setiap amalan.",
    date: "22 Januari 2023",
  },
];

// Mock related hadiths
const relatedHadiths = [
  {
    id: "2",
    title: "Hadits tentang Niat dalam Beramal",
    description: "Kumpulan hadits yang membahas pentingnya niat dalam melakukan setiap amalan.",
    image: "https://source.unsplash.com/random/800x600/?heart",
    type: "hadith" as "hadith", // Fixed: explicitly casting to literal type
    rating: 4.8,
    date: "3 Februari 2023",
  },
  {
    id: "3",
    title: "Hadits Qudsi: Firman Allah yang Diriwayatkan Rasulullah",
    description: "Penjelasan tentang hadits-hadits qudsi dan perbedaannya dengan hadits nabawi.",
    image: "https://source.unsplash.com/random/800x600/?sky",
    type: "hadith" as "hadith", // Fixed: explicitly casting to literal type
    rating: 4.9,
    date: "22 Maret 2023",
  },
  {
    id: "4",
    title: "Hadits tentang Berbakti kepada Orang Tua",
    description: "Kumpulan hadits yang membahas keutamaan dan cara berbakti kepada kedua orang tua.",
    image: "https://source.unsplash.com/random/800x600/?family",
    type: "hadith" as "hadith", // Fixed: explicitly casting to literal type
    rating: 4.7,
    date: "10 April 2023",
  },
];

const Hadith = () => {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [comments, setComments] = useState(initialComments);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now().toString(),
      user: {
        id: "user",
        username: "user",
        avatar: "/placeholder.svg",
      },
      content,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    setComments([newComment, ...comments]);
  };

  const handleDownload = () => {
    // In a real app, this would trigger a download of the hadith image
    alert("Mengunduh hadits...");
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 py-6">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-6 rounded-xl space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-semibold">{hadithData.title}</h2>
                  <div className="relative">
                    <img 
                      src={hadithData.image} 
                      alt={hadithData.title} 
                      className="w-full max-h-96 object-cover rounded-lg"
                    />
                    <Button 
                      onClick={handleDownload} 
                      variant="secondary" 
                      size="sm" 
                      className="absolute bottom-4 right-4 flex items-center space-x-1"
                    >
                      <Download className="h-4 w-4" />
                      <span>Unduh</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-right">
                    <p className="text-2xl font-arabic leading-loose">{hadithData.arabicText}</p>
                  </div>
                  
                  <div className="text-left">
                    <p className="text-lg">{hadithData.translation}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {hadithData.narrator} • {hadithData.source}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                      Disusun oleh {hadithData.author} • {hadithData.date} • {hadithData.views} tayangan
                    </p>
                  </div>
                  
                  <Rating 
                    initialRating={userRating || hadithData.rating} 
                    totalRatings={hadithData.totalRatings}
                    onRatingChange={handleRatingChange}
                  />
                </div>
                
                <p className="text-left text-muted-foreground">
                  {hadithData.description}
                </p>
              </div>
              
              <CommentSection 
                comments={comments} 
                onAddComment={handleAddComment}
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-left">Hadits Terkait</h2>
              <div className="space-y-4">
                {relatedHadiths.map(hadith => (
                  <ContentCard key={hadith.id} {...hadith} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-white/10 glass">
        <div className="container">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DAARUL ILMI - Rumah Digital Tempatnya Ilmu
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Hadith;
