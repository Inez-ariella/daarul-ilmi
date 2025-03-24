
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
  Play 
} from "lucide-react";

export const AdminAudios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Mock audio data
  const audios = [
    {
      id: "1",
      title: "Ceramah Jumat: Keutamaan Ramadhan",
      description: "Ustadz Ahmad membahas keutamaan bulan Ramadhan dan ibadah di dalamnya.",
      duration: "25:12",
      date: "2024-06-14",
      plays: 987,
      ratings: 4.7
    },
    {
      id: "2",
      title: "Tafsir Surah Yasin",
      description: "Penjelasan mendalam tentang makna dan tafsir Surah Yasin.",
      duration: "32:45",
      date: "2024-06-08",
      plays: 876,
      ratings: 4.8
    },
    {
      id: "3",
      title: "Murottal Juz 30",
      description: "Bacaan Al-Quran Juz 30 dengan tajwid yang benar.",
      duration: "48:30",
      date: "2024-06-02",
      plays: 1234,
      ratings: 4.9
    },
    {
      id: "4",
      title: "Kisah Para Sahabat Nabi",
      description: "Kisah inspiratif dari kehidupan para sahabat Nabi Muhammad SAW.",
      duration: "35:18",
      date: "2024-05-25",
      plays: 765,
      ratings: 4.6
    },
    {
      id: "5",
      title: "Doa-doa Harian",
      description: "Kumpulan doa-doa yang dibaca dalam kehidupan sehari-hari seorang muslim.",
      duration: "22:40",
      date: "2024-05-15",
      plays: 654,
      ratings: 4.7
    }
  ];
  
  const filteredAudios = audios.filter(audio => 
    audio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audio.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Audio</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Audio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Audio Baru</DialogTitle>
              <DialogDescription>
                Isi informasi audio yang ingin ditambahkan ke koleksi.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Judul Audio</Label>
                <Input id="title" placeholder="Masukkan judul audio" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Masukkan deskripsi audio"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="audio-file">File Audio</Label>
                  <Input id="audio-file" type="file" accept="audio/*" />
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
                  <Input id="category" placeholder="Kategori audio" />
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
          <CardTitle>Daftar Audio</CardTitle>
          <CardDescription>
            Kelola semua konten audio yang tersedia di perpustakaan digital.
          </CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari audio..."
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
                <TableHead className="text-right">Plays</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudios.length > 0 ? (
                filteredAudios.map((audio) => (
                  <TableRow key={audio.id}>
                    <TableCell className="font-medium">{audio.title}</TableCell>
                    <TableCell>{audio.duration}</TableCell>
                    <TableCell>{new Date(audio.date).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell className="text-right">{audio.plays}</TableCell>
                    <TableCell className="text-right">{audio.ratings}/5</TableCell>
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
                            <Play className="mr-2 h-4 w-4" />
                            <span>Putar</span>
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
                    Tidak ada audio yang ditemukan.
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
