
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Video, Music, BookOpen, TrendingUp, Calendar } from "lucide-react";

export const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Pengguna",
      value: "1,234",
      icon: Users,
      trend: "+5.2%",
      description: "Dari bulan lalu",
    },
    {
      title: "Video",
      value: "45",
      icon: Video,
      trend: "+2.3%",
      description: "Dari bulan lalu",
    },
    {
      title: "Audio",
      value: "32",
      icon: Music,
      trend: "+3.1%",
      description: "Dari bulan lalu",
    },
    {
      title: "Hadits",
      value: "150",
      icon: BookOpen,
      trend: "+1.5%",
      description: "Dari bulan lalu",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center pt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">{stat.trend}</span>
                <span className="ml-1">{stat.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Aktivitas Terbaru</TabsTrigger>
          <TabsTrigger value="popular">Konten Populer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Pengunjung</CardTitle>
              <CardDescription>
                Jumlah kunjungan website dalam 30 hari terakhir
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center border-t pt-4">
              <p className="text-muted-foreground">Grafik kunjungan website</p>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Konten Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Video Kajian Tauhid', 'Audio Ceramah Jum\'at', 'Hadits Pilihan Minggu Ini'].map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div className="rounded-full bg-primary/10 p-1 mr-2">
                        {i === 0 ? <Video className="h-3 w-3 text-primary" /> :
                         i === 1 ? <Music className="h-3 w-3 text-primary" /> :
                         <BookOpen className="h-3 w-3 text-primary" />}
                      </div>
                      <div className="text-sm">{item}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Pengguna Aktif
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Ahmad', 'Fatimah', 'Umar', 'Aisyah'].map((user, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 mr-2 flex items-center justify-center">
                        {user[0]}
                      </div>
                      <div className="text-sm">{user}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Jadwal Konten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { day: 'Senin', content: 'Video Kajian Tauhid' },
                    { day: 'Rabu', content: 'Audio Tafsir Al-Quran' },
                    { day: 'Jumat', content: 'Hadits Pilihan' },
                    { day: 'Minggu', content: 'Video Tanya Jawab' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div className="rounded-full bg-primary/10 p-1 mr-2">
                        <Calendar className="h-3 w-3 text-primary" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{item.day}:</span> {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>
                Aktivitas pengguna dan perubahan konten terbaru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: 'Admin', action: 'menambahkan video baru', time: '10 menit yang lalu' },
                  { user: 'Ustadz Ahmad', action: 'mengunggah audio kajian', time: '2 jam yang lalu' },
                  { user: 'Moderator', action: 'memperbarui hadits', time: '5 jam yang lalu' },
                  { user: 'Admin', action: 'menerima pendaftaran pengguna baru', time: '1 hari yang lalu' },
                  { user: 'Ustadzah Fatimah', action: 'mengomentari video', time: '1 hari yang lalu' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 mr-3 flex items-center justify-center text-xs">
                      {activity.user[0]}
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Konten Populer</CardTitle>
              <CardDescription>
                Konten yang paling banyak dilihat dalam sebulan terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Kajian Tauhid: Mengenal Allah', type: 'video', views: '1,234', rating: '4.8/5' },
                  { title: 'Ceramah Jumat: Keutamaan Ramadhan', type: 'audio', views: '987', rating: '4.7/5' },
                  { title: 'Hadist tentang Keutamaan Ilmu', type: 'hadith', views: '876', rating: '4.9/5' },
                  { title: 'Fiqih Ibadah: Tata Cara Shalat', type: 'video', views: '765', rating: '4.6/5' },
                  { title: 'Tafsir Surah Al-Fatihah', type: 'audio', views: '654', rating: '4.8/5' }
                ].map((content, i) => (
                  <div key={i} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 mr-3 flex items-center justify-center text-xs">
                      {content.type === 'video' ? <Video className="h-4 w-4" /> : 
                       content.type === 'audio' ? <Music className="h-4 w-4" /> : 
                       <BookOpen className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{content.title}</p>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span className="capitalize">{content.type}</span>
                        <span>{content.views} views</span>
                        <span>Rating: {content.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
