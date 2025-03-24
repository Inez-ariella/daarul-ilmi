
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

export const AdminHadiths = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Mock hadith data
  const hadiths = [
    {
      id: "1",
      title: "Hadits tentang Niat",
      arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
      translation: "Sesungguhnya setiap amalan tergantung pada niatnya",
      narrator: "Umar bin Khattab",
      source: "Bukhari & Muslim",
      rating: 4.9,
      views: 1234
    },
    {
      id: "2",
      title: "Hadits tentang Ilmu",
      arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
      translation: "Menuntut ilmu itu wajib bagi setiap Muslim",
      narrator: "Anas bin Malik",
      source: "Ibnu Majah",
      rating: 4.8,
      views: 987
    },
    {
      id: "3",
      title: "Hadits tentang Kebersihan",
      arabic: "الطهور شطر الإيمان",
      translation: "Kebersihan sebagian dari iman",
      narrator: "Abu Malik Al-Asy'ari",
      source: "Muslim",
      rating: 4.7,
      views: 876
    },
    {
      id: "4",
      title: "Hadits tentang Amal Jariyah",
      arabic: "إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ",
      translation: "Apabila manusia meninggal dunia, terputuslah amalnya kecuali dari tiga perkara",
      narrator: "Abu Hurairah",
      source: "Muslim",
      rating: 4.9,
      views: 765
    },
    {
      id: "5",
      title: "Hadits tentang Silaturahmi",
      arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَصِلْ رَحِمَهُ",
      translation: "Barangsiapa beriman kepada Allah dan hari akhir, maka hendaklah ia menyambung silaturahmi",
      narrator: "Abu Hurairah",
      source: "Bukhari",
      rating: 4.8,
      views: 654
    }
  ];
  
  const filteredHadiths = hadiths.filter(hadith => 
    hadith.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hadith.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hadith.narrator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Hadits</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Hadits
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Hadits Baru</DialogTitle>
              <DialogDescription>
                Isi informasi hadits yang ingin ditambahkan ke koleksi.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Judul/Topik Hadits</Label>
                <Input id="title" placeholder="Masukkan judul atau topik hadits" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="arabic">Teks Arab</Label>
                <Textarea 
                  id="arabic" 
                  placeholder="Masukkan teks hadits dalam bahasa Arab"
                  dir="rtl"
                  className="text-right min-h-[100px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="translation">Terjemahan</Label>
                <Textarea 
                  id="translation" 
                  placeholder="Masukkan terjemahan hadits"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="narrator">Perawi</Label>
                  <Input id="narrator" placeholder="Nama perawi hadits" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="source">Sumber</Label>
                  <Input id="source" placeholder="Bukhari, Muslim, dll." />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="explanation">Penjelasan (Opsional)</Label>
                <Textarea 
                  id="explanation" 
                  placeholder="Masukkan penjelasan atau syarah hadits"
                  className="min-h-[100px]"
                />
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
          <CardTitle>Koleksi Hadits</CardTitle>
          <CardDescription>
            Kelola koleksi hadits yang tersedia di perpustakaan digital.
          </CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari hadits..."
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
                <TableHead>Judul/Topik</TableHead>
                <TableHead>Perawi</TableHead>
                <TableHead>Sumber</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHadiths.length > 0 ? (
                filteredHadiths.map((hadith) => (
                  <TableRow key={hadith.id}>
                    <TableCell className="font-medium">{hadith.title}</TableCell>
                    <TableCell>{hadith.narrator}</TableCell>
                    <TableCell>{hadith.source}</TableCell>
                    <TableCell className="text-right">{hadith.views}</TableCell>
                    <TableCell className="text-right">{hadith.rating}/5</TableCell>
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
                    Tidak ada hadits yang ditemukan.
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
