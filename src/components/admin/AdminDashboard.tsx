
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Video, 
  Music, 
  FileText, 
  Users, 
  Activity,
  Calendar
} from "lucide-react";
import { ContentCard } from "@/components/ContentCard";
import { dummyVideos, dummyAudios, dummyHadiths } from "@/utils/dummyData";
import { AdminHeader } from "./AdminHeader";

export const AdminDashboard = () => {
  // Get current date
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate total content
  const totalVideos = dummyVideos.length;
  const totalAudios = dummyAudios.length;
  const totalHadiths = dummyHadiths.length;
  const totalUsers = 240; // Mock value
  
  // Get latest content
  const latestVideo = dummyVideos[0];
  const latestAudio = dummyAudios[0];
  const latestHadith = dummyHadiths[0];
  
  return (
    <div className="space-y-6">
      <AdminHeader />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-muted-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{currentDate}</span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Video
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVideos}</div>
            <p className="text-xs text-muted-foreground">
              +2 ditambahkan bulan ini
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Audio
            </CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAudios}</div>
            <p className="text-xs text-muted-foreground">
              +3 ditambahkan bulan ini
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Hadits
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHadiths}</div>
            <p className="text-xs text-muted-foreground">
              +5 ditambahkan bulan ini
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pengguna
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +24 pengguna baru bulan ini
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Aktivitas Terkini</CardTitle>
            <CardDescription>
              Aktivitas terbaru pada platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Video baru ditambahkan</p>
                  <p className="text-xs text-muted-foreground">
                    {latestVideo.title} - {new Date(latestVideo.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Audio baru ditambahkan</p>
                  <p className="text-xs text-muted-foreground">
                    {latestAudio.title} - {new Date(latestAudio.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Hadits baru ditambahkan</p>
                  <p className="text-xs text-muted-foreground">
                    {latestHadith.title} - {new Date(latestHadith.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Pengguna baru terdaftar</p>
                  <p className="text-xs text-muted-foreground">
                    12 pengguna baru telah mendaftar minggu ini
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Konten Populer</CardTitle>
            <CardDescription>
              Konten dengan rating tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Video className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Video Terpopuler</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {dummyVideos[4].title}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Music className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Audio Terpopuler</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {dummyAudios[2].title}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Hadits Terpopuler</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {dummyHadiths[1].title}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Konten Terbaru</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ContentCard 
            id={latestVideo.id}
            title={latestVideo.title}
            description={latestVideo.description}
            image={latestVideo.thumbnail_url || "https://images.unsplash.com/photo-1604326531570-2689ea7ae266?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXNsYW1pYyUyMHZpZGVvfGVufDB8fDB8fHww"}
            type="video"
            rating={4.8}
            date={new Date(latestVideo.created_at).toLocaleDateString('id-ID')}
            duration={latestVideo.duration}
          />
          
          <ContentCard 
            id={latestAudio.id}
            title={latestAudio.title}
            description={latestAudio.description}
            image={latestAudio.thumbnail_url || "https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGlzbGFtaWMlMjBhdWRpb3xlbnwwfHwwfHx8MA%3D%3D"}
            type="audio"
            rating={4.6}
            date={new Date(latestAudio.created_at).toLocaleDateString('id-ID')}
            duration={latestAudio.duration}
          />
          
          <ContentCard 
            id={latestHadith.id}
            title={latestHadith.title}
            description={latestHadith.description}
            image={latestHadith.thumbnail_url || "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXNsYW1pYyUyMGJvb2t8ZW58MHx8MHx8fDA%3D"}
            type="hadith"
            rating={4.9}
            date={new Date(latestHadith.created_at).toLocaleDateString('id-ID')}
          />
        </div>
      </div>
    </div>
  );
};
