import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ContentCard, ContentCardProps } from "@/components/ContentCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

// Mock user activity data
const userActivity = {
  ratings: [
    {
      id: "1",
      title: "Pengantar Ilmu Tauhid",
      description: "Mengenal dasar-dasar Tauhid dalam Islam dan pentingnya dalam kehidupan seorang Muslim.",
      image: "https://source.unsplash.com/random/800x600/?mosque",
      type: "video" as const,
      rating: 5.0,
      date: "15 Juni 2023",
      duration: "45:20"
    },
    {
      id: "1",
      title: "Tafsir Surah Al-Fatihah",
      description: "Penjelasan mendalam tentang makna dan tafsir surah Al-Fatihah yang merupakan pembuka Al-Qur'an.",
      image: "https://source.unsplash.com/random/800x600/?quran",
      type: "audio" as const,
      rating: 4.5,
      date: "8 Mei 2023",
      duration: "32:10"
    },
  ],
  comments: [
    {
      id: "2",
      title: "Fiqih Shalat: Tuntunan Shalat Yang Benar",
      description: "Pembelajaran mendetail tentang tata cara shalat yang sesuai dengan sunnah Rasulullah SAW.",
      image: "https://source.unsplash.com/random/800x600/?prayer",
      type: "video" as const,
      rating: 4.7,
      date: "28 Juli 2023",
      duration: "56:15",
      comment: "Alhamdulillah, sangat bermanfaat untuk memperbaiki shalat saya. Jazakallahu khairan."
    },
    {
      id: "2",
      title: "Hadits tentang Niat dalam Beramal",
      description: "Kumpulan hadits yang membahas pentingnya niat dalam melakukan setiap amalan.",
      image: "https://source.unsplash.com/random/800x600/?heart",
      type: "hadith" as const,
      rating: 4.8,
      date: "5 Februari 2023",
      comment: "Subhanallah, hadits ini mengingatkan saya untuk selalu meluruskan niat dalam beribadah."
    },
  ]
};

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Initialize form with user data
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [isAuthenticated, navigate, user]);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profil diperbarui",
      description: "Informasi profil Anda telah berhasil diperbarui.",
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate("/");
    
    toast({
      title: "Berhasil keluar",
      description: "Anda telah keluar dari akun Anda.",
    });
  };
  
  if (!isAuthenticated || !user) {
    return null; // This will redirect in the useEffect above
  }
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 py-6">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile sidebar */}
            <div className="md:w-1/4">
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white/30">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.username}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-semibold">{user.username}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="w-full pt-4 space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Profil Saya
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Aktivitas
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Pengaturan
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-destructive hover:text-destructive"
                        onClick={handleLogout}
                      >
                        Keluar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="md:w-3/4">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="glass-card mb-4 w-full justify-start">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="activity">Aktivitas</TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card className="glass-card">
                    <CardContent className="pt-6">
                      <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="avatar">Avatar</Label>
                            <div className="flex items-center space-x-4">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={user.avatar || "/placeholder.svg"}
                                  alt="Avatar"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <Button type="button" variant="outline">
                                Ubah Avatar
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <Button type="submit">Simpan Perubahan</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Activity Tab */}
                <TabsContent value="activity">
                  <Card className="glass-card">
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-left">Rating Saya</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {userActivity.ratings.map((item, index) => (
                              <ContentCard key={`rating-${index}`} {...item} />
                            ))}
                            
                            {userActivity.ratings.length === 0 && (
                              <p className="text-muted-foreground col-span-2 text-center py-8">
                                Anda belum memberikan rating.
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-left">Komentar Saya</h3>
                          
                          <div className="space-y-4">
                            {userActivity.comments.map((item, index) => (
                              <div key={`comment-${index}`} className="glass-card p-4 rounded-lg space-y-4">
                                <div className="flex space-x-4">
                                  <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="text-left">
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p className="text-xs text-muted-foreground">{item.date}</p>
                                  </div>
                                </div>
                                <div className="text-left">
                                  <p className="text-sm border-l-2 border-primary/30 pl-3 py-1">
                                    {item.comment}
                                  </p>
                                </div>
                              </div>
                            ))}
                            
                            {userActivity.comments.length === 0 && (
                              <p className="text-muted-foreground text-center py-8">
                                Anda belum memberikan komentar.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
