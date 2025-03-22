
import { Navbar } from "@/components/Navbar";
import { AudioPlayer } from "@/components/ContentPlayer";
import { Rating } from "@/components/Rating";
import { CommentSection } from "@/components/CommentSection";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ContentCard, ContentCardProps } from "@/components/ContentCard";

// Mock audio data
const audioData = {
  id: "1",
  title: "Tafsir Surah Al-Fatihah",
  description: "Penjelasan mendalam tentang makna dan tafsir surah Al-Fatihah yang merupakan pembuka Al-Qur'an. Kajian ini membahas arti dari setiap ayat dan bagaimana penerapannya dalam kehidupan sehari-hari. Tafsir disampaikan oleh Ustadz Muhammad Rizki.",
  src: "https://soundbible.com/mp3/wind-ambient-sound-04-22-14-14-28-02-rec-57619-1-22883.mp3",
  image: "https://source.unsplash.com/random/800x600/?quran",
  date: "5 Mei 2023",
  author: "Ustadz Muhammad Rizki",
  listens: 850,
  rating: 4.9,
  totalRatings: 95,
};

// Mock comments
const initialComments = [
  {
    id: "1",
    user: {
      id: "101",
      username: "Ahmad_Syafii",
      avatar: "https://source.unsplash.com/random/100x100/?man",
    },
    content: "Alhamdulillah, penjelasan yang sangat komprehensif tentang surah Al-Fatihah. Saya mendapat pemahaman baru.",
    date: "7 Mei 2023",
  },
  {
    id: "2",
    user: {
      id: "102",
      username: "Fatimah_Azzahra",
      avatar: "https://source.unsplash.com/random/100x100/?woman",
    },
    content: "Jazakallahu khairan atas kajian yang bermanfaat ini. Semoga Allah membalas kebaikan Ustadz.",
    date: "8 Mei 2023",
  },
];

// Mock related audios
const relatedAudios = [
  {
    id: "2",
    title: "Keutamaan Bulan Ramadhan",
    description: "Kajian tentang keutamaan dan amalan di bulan suci Ramadhan.",
    image: "https://source.unsplash.com/random/800x600/?ramadan",
    type: "audio" as "audio", // Fixed: explicitly casting to literal type
    rating: 4.6,
    date: "12 April 2023",
    duration: "28:45"
  },
  {
    id: "3",
    title: "Akhlak dalam Bermuamalah",
    description: "Pentingnya akhlak dalam berinteraksi dan bertransaksi dengan sesama manusia.",
    image: "https://source.unsplash.com/random/800x600/?people",
    type: "audio" as "audio", // Fixed: explicitly casting to literal type
    rating: 4.7,
    date: "20 Juni 2023",
    duration: "41:20"
  },
  {
    id: "4",
    title: "Menjaga Kebersihan sebagai Bagian dari Iman",
    description: "Kajian tentang pentingnya kebersihan dalam Islam dan hubungannya dengan keimanan.",
    image: "https://source.unsplash.com/random/800x600/?clean",
    type: "audio" as "audio", // Fixed: explicitly casting to literal type
    rating: 4.5,
    date: "8 Juli 2023",
    duration: "25:30"
  },
];

const Audio = () => {
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

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 py-6">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <AudioPlayer 
                src={audioData.src} 
                title={audioData.title} 
                image={audioData.image} 
              />
              
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-left">{audioData.title}</h1>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                      {audioData.author} • {audioData.date} • {audioData.listens} kali didengar
                    </p>
                  </div>
                  
                  <Rating 
                    initialRating={userRating || audioData.rating} 
                    totalRatings={audioData.totalRatings}
                    onRatingChange={handleRatingChange}
                  />
                </div>
                
                <p className="text-left text-muted-foreground">
                  {audioData.description}
                </p>
              </div>
              
              <CommentSection 
                comments={comments} 
                onAddComment={handleAddComment}
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-left">Audio Terkait</h2>
              <div className="space-y-4">
                {relatedAudios.map(audio => (
                  <ContentCard key={audio.id} {...audio} />
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

export default Audio;
