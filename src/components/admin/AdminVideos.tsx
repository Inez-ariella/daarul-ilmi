
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Eye 
} from "lucide-react";

export const AdminVideos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Mock video data
  const videos = [
    {
      id: "1",
      title: "Kajian Tauhid: Mengenal Allah",
      description: "Ustadz Ahmad membahas konsep dasar tauhid dan mengenal Allah SWT.",
      duration: "45:23",
      date: "2024-06-15",
      views: 1234,
      ratings: 4.8
    },
    {
      id: "2",
      title: "Fiqih Ibadah: Tata Cara Shalat",
      description: "Panduan lengkap tentang tata cara shalat yang benar sesuai sunnah.",
      duration: "38:15",
      date: "2024-06-10",
      views: 987,
      ratings: 4.6
    },
    {
      id: "3",
      title: "Adab dalam Islam",
      description: "Pembahasan tentang adab dan akhlak dalam kehidupan sehari-hari seorang muslim.",
      duration: "42:30",
      date: "2024-06-05",
      views: 876,
      ratings: 4.7
    },
    {
      id: "4",
      title: "Sirah Nabawiyah: Kisah Perjuangan Rasulullah",
      description: "Meneladani kisah perjuangan Rasulullah SAW dalam menyebarkan Islam.",
      duration: "55:12",
      date: "2024-05-28",
      views: 765,
      ratings: 4.9
    },
    {
      id: "5",
      title: "Tafsir Surah Al-Fatihah",
      description: "Penjelasan mendalam tentang makna dan tafsir Surah Al-Fatihah.",
      duration: "40:05",
      date: "2024-05-20",
      views: 654,
      ratings: 4.8
    }
  ];
  
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Video</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Video Baru</DialogTitle>
              <DialogDescription>
                Isi informasi video yang ingin ditambahkan ke koleksi.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Judul Video</Label>
                <Input id="title" placeholder="Masukkan judul video" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Masukkan deskripsi video"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="video-file">File Video</Label>
                  <Input id="video-file" type="file" accept="video/*" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <Input id="thumbnail" type="file" accept="image/*" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Durasi</Label>
                  <Input id="duration" placeholder="HH:MM:SS" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input id="category" placeholder="Kategori video" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Video</CardTitle>
          <CardDescription>
            Kelola semua konten video yang tersedia di perpustakaan digital.
          </CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari video..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium">{video.title}</TableCell>
                    <TableCell>{video.duration}</TableCell>
                    <TableCell>{new Date(video.date).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell className="text-right">{video.views}</TableCell>
                    <TableCell className="text-right">{video.ratings}/5</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Aksi</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Lihat</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Hapus</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Tidak ada video yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
