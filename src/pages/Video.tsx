
import { Navbar } from "@/components/Navbar";
import { VideoPlayer } from "@/components/ContentPlayer";
import { Rating } from "@/components/Rating";
import { CommentSection } from "@/components/CommentSection";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ContentCard } from "@/components/ContentCard";

// Mock video data
const videoData = {
  id: "1",
  title: "Pengantar Ilmu Tauhid",
  description: "Mengenal dasar-dasar Tauhid dalam Islam dan pentingnya dalam kehidupan seorang Muslim. Kajian ini membahas konsep keesaan Allah sebagai pondasi utama dalam Islam, serta bagaimana memahami dan mengimplementasikan tauhid dalam kehidupan sehari-hari. Dipresentasikan oleh Ustadz Ahmad Fauzi.",
  src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  poster: "https://source.unsplash.com/random/800x600/?mosque",
  date: "10 Juni 2023",
  author: "Ustadz Ahmad Fauzi",
  views: 1250,
  rating: 4.8,
  totalRatings: 124,
};

// Mock comments
const initialComments = [
  {
    id: "1",
    user: {
      id: "101",
      username: "santri_digital",
      avatar: "https://source.unsplash.com/random/100x100/?person",
    },
    content: "Alhamdulillah, sangat bermanfaat untuk pemahaman dasar tentang tauhid. Jazakallahu khairan.",
    date: "12 Juni 2023",
  },
  {
    id: "2",
    user: {
      id: "102",
      username: "pencari_ilmu",
      avatar: "https://source.unsplash.com/random/100x100/?face",
    },
    content: "Subhanallah, penjelasannya sangat jelas dan mudah dipahami. Semoga menjadi amal jariyah bagi ustadz.",
    date: "14 Juni 2023",
  },
];

// Mock related videos
const relatedVideos = [
  {
    id: "2",
    title: "Fiqih Shalat: Tuntunan Shalat Yang Benar",
    description: "Pembelajaran mendetail tentang tata cara shalat yang sesuai dengan sunnah Rasulullah SAW.",
    image: "https://source.unsplash.com/random/800x600/?prayer",
    type: "video",
    rating: 4.7,
    date: "25 Juli 2023",
    duration: "56:15"
  },
  {
    id: "3",
    title: "Adab Mencari Ilmu dalam Islam",
    description: "Membahas etika dan adab dalam mencari ilmu menurut perspektif Islam.",
    image: "https://source.unsplash.com/random/800x600/?study",
    type: "video",
    rating: 4.9,
    date: "3 Agustus 2023",
    duration: "38:45"
  },
  {
    id: "4",
    title: "Sirah Nabawiyah: Kehidupan Rasulullah SAW",
    description: "Seri pembelajaran tentang kehidupan dan perjalanan Nabi Muhammad SAW dari kelahiran hingga wafatnya.",
    image: "https://source.unsplash.com/random/800x600/?desert",
    type: "video",
    rating: 5.0,
    date: "17 September 2023",
    duration: "1:10:30"
  },
];

const Video = () => {
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
              <VideoPlayer 
                src={videoData.src} 
                title={videoData.title} 
                poster={videoData.poster} 
              />
              
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-left">{videoData.title}</h1>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                      {videoData.author} • {videoData.date} • {videoData.views} tayangan
                    </p>
                  </div>
                  
                  <Rating 
                    initialRating={userRating || videoData.rating} 
                    totalRatings={videoData.totalRatings}
                    onRatingChange={handleRatingChange}
                  />
                </div>
                
                <p className="text-left text-muted-foreground">
                  {videoData.description}
                </p>
              </div>
              
              <CommentSection 
                comments={comments} 
                onAddComment={handleAddComment}
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-left">Video Terkait</h2>
              <div className="space-y-4">
                {relatedVideos.map(video => (
                  <ContentCard key={video.id} {...video} />
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

export default Video;
