import { useState, useEffect } from "react";
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
  Play,
  AlertCircle,
  Loader2
} from "lucide-react";
import { FileUploader } from "@/components/ui/file-uploader";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { dummyVideos } from "@/utils/dummyData";
import { AdminHeader } from "./AdminHeader";

const videoFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().optional(),
  duration: z.string().optional(),
  file_url: z.string().url("A valid file URL is required"),
  thumbnail_url: z.string().url("A valid thumbnail URL is required").optional(),
  file_type: z.string(),
  file_size: z.number()
});

type VideoFormValues = z.infer<typeof videoFormSchema>;

interface Video {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url?: string;
  file_type: string;
  file_size?: number;
  duration?: string;
  category?: string;
  created_at: string;
}

export const AdminVideos = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
      file_url: "",
      file_type: "",
      file_size: 0
    }
  });

  const fetchVideos = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .like('file_type', 'video/%')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        setVideos(data);
      } else {
        setVideos(dummyVideos);
      }
    } catch (err: any) {
      console.error('Error fetching videos:', err);
      setVideos(dummyVideos);
      setError("Could not connect to the database. Displaying dummy data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileUploadComplete = (fileUrl: string, fileType: string, fileSize: number) => {
    form.setValue("file_url", fileUrl);
    form.setValue("file_type", fileType);
    form.setValue("file_size", fileSize);
  };

  const onSubmit = async (values: VideoFormValues) => {
    try {
      const { data, error } = await supabase
        .from('media_files')
        .insert([{
          title: values.title,
          description: values.description,
          file_url: values.file_url,
          thumbnail_url: values.thumbnail_url || null,
          file_type: values.file_type,
          file_size: values.file_size,
          duration: values.duration || null,
          category: values.category || null
        }])
        .select();
      
      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Video added to local collection",
          description: `${values.title} has been added to the local video collection.`,
        });
      } else {
        toast({
          title: "Video added successfully",
          description: `${values.title} has been added to the video collection.`,
        });
      }
      
      form.reset();
      setIsAddDialogOpen(false);
      
      fetchVideos();
    } catch (err: any) {
      console.error('Error adding video:', err);
      toast({
        variant: "destructive",
        title: "Error adding video",
        description: err.message || 'An error occurred while adding the video',
      });
    }
  };

  const handleDeleteVideo = async () => {
    if (!selectedVideo) return;
    
    try {
      const { error } = await supabase
        .from('media_files')
        .delete()
        .eq('id', selectedVideo.id);
      
      if (error) {
        console.error('Supabase error:', error);
      }
      
      setIsDeleteDialogOpen(false);
      setSelectedVideo(null);
      
      fetchVideos();
      
      toast({
        title: "Video deleted successfully",
        description: `${selectedVideo.title} has been removed from the video collection.`,
      });
    } catch (err: any) {
      console.error('Error deleting video:', err);
      toast({
        variant: "destructive",
        title: "Error deleting video",
        description: err.message || 'An error occurred while deleting the video',
      });
    }
  };

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminHeader />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Video</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Tambah Video Baru</DialogTitle>
              <DialogDescription>
                Isi informasi video yang ingin ditambahkan ke koleksi.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Judul Video</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan judul video" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deskripsi</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Masukkan deskripsi video"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <FormLabel>File Video</FormLabel>
                    <FileUploader 
                      onUploadComplete={handleFileUploadComplete}
                      acceptedFileTypes="video/*"
                      maxSizeMB={200}
                    />
                    {form.formState.errors.file_url && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.file_url.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Durasi</FormLabel>
                          <FormControl>
                            <Input placeholder="HH:MM:SS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kategori</FormLabel>
                          <FormControl>
                            <Input placeholder="Kategori video" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="thumbnail_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Thumbnail (opsional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" disabled={!form.formState.isValid}>
                    Simpan
                  </Button>
                </DialogFooter>
              </form>
            </Form>
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
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Durasi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Ukuran</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium">{video.title}</TableCell>
                      <TableCell>{video.duration || "N/A"}</TableCell>
                      <TableCell>
                        {new Date(video.created_at).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell>{video.category || "N/A"}</TableCell>
                      <TableCell>
                        {video.file_size 
                          ? `${(video.file_size / (1024 * 1024)).toFixed(2)} MB`
                          : "N/A"
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Aksi</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                window.open(video.file_url, "_blank");
                              }}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              <span>Putar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                toast({
                                  title: "Coming soon",
                                  description: "Edit functionality will be available soon.",
                                });
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedVideo(video);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
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
                      {searchTerm ? "Tidak ada video yang sesuai dengan pencarian." : "Belum ada video yang ditambahkan."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus video "{selectedVideo?.title}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteVideo}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
