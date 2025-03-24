
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
  FileText,
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
import { dummyHadiths } from "@/utils/dummyData";
import { AdminHeader } from "./AdminHeader";

// Define the form schema
const hadithFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().optional(),
  file_url: z.string().url("A valid file URL is required"),
  thumbnail_url: z.string().url("A valid thumbnail URL is required").optional(),
  file_type: z.string(),
  file_size: z.number()
});

type HadithFormValues = z.infer<typeof hadithFormSchema>;

// Define the hadith data type
interface Hadith {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url?: string;
  file_type: string;
  file_size?: number;
  category?: string;
  created_at: string;
}

export const AdminHadiths = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form
  const form = useForm<HadithFormValues>({
    resolver: zodResolver(hadithFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      file_url: "",
      file_type: "",
      file_size: 0
    }
  });

  // Fetch hadith data
  const fetchHadiths = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real application, this would fetch from Supabase
      // For now, we'll use our dummy data
      setHadiths(dummyHadiths);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Error fetching hadiths:', err);
      setError(err.message || 'An error occurred while fetching hadith files');
      toast({
        variant: "destructive",
        title: "Error fetching hadith files",
        description: err.message || 'An error occurred while fetching hadith files',
      });
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchHadiths();
  }, []);

  // Handle file upload complete
  const handleFileUploadComplete = (fileUrl: string, fileType: string, fileSize: number) => {
    form.setValue("file_url", fileUrl);
    form.setValue("file_type", fileType);
    form.setValue("file_size", fileSize);
  };

  // Handle form submission
  const onSubmit = async (values: HadithFormValues) => {
    try {
      // In a real app, this would save to Supabase
      toast({
        title: "Hadith added successfully",
        description: `${values.title} has been added to the hadith collection.`,
      });
      
      // Reset form and close the dialog
      form.reset();
      setIsAddDialogOpen(false);
      
      // Update the hadith list (in a real app)
      fetchHadiths();
    } catch (err: any) {
      console.error('Error adding hadith:', err);
      toast({
        variant: "destructive",
        title: "Error adding hadith",
        description: err.message || 'An error occurred while adding the hadith',
      });
    }
  };

  // Handle hadith deletion
  const handleDeleteHadith = async () => {
    if (!selectedHadith) return;
    
    try {
      // In a real app, this would delete from Supabase
      toast({
        title: "Hadith deleted successfully",
        description: `${selectedHadith.title} has been removed from the hadith collection.`,
      });
      
      // Close the dialog and reset the selected hadith
      setIsDeleteDialogOpen(false);
      setSelectedHadith(null);
      
      // Update the hadith list (in a real app)
      fetchHadiths();
    } catch (err: any) {
      console.error('Error deleting hadith:', err);
      toast({
        variant: "destructive",
        title: "Error deleting hadith",
        description: err.message || 'An error occurred while deleting the hadith',
      });
    }
  };

  // Filter hadiths based on search term
  const filteredHadiths = hadiths.filter(hadith => 
    hadith.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hadith.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminHeader />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Hadits</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Hadits
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Tambah Hadits Baru</DialogTitle>
              <DialogDescription>
                Isi informasi hadits yang ingin ditambahkan ke koleksi.
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
                          <FormLabel>Judul Hadits</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan judul hadits" {...field} />
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
                              placeholder="Masukkan deskripsi hadits"
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
                    <FormLabel>File Hadits (PDF)</FormLabel>
                    <FileUploader 
                      onUploadComplete={handleFileUploadComplete}
                      acceptedFileTypes="application/pdf"
                      maxSizeMB={10}
                    />
                    {form.formState.errors.file_url && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.file_url.message}
                      </p>
                    )}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <FormControl>
                          <Input placeholder="Kategori hadits" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
          <CardTitle>Daftar Hadits</CardTitle>
          <CardDescription>
            Kelola semua konten hadits yang tersedia di perpustakaan digital.
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
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Ukuran</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHadiths.length > 0 ? (
                  filteredHadiths.map((hadith) => (
                    <TableRow key={hadith.id}>
                      <TableCell className="font-medium">{hadith.title}</TableCell>
                      <TableCell>{hadith.category || "N/A"}</TableCell>
                      <TableCell>
                        {new Date(hadith.created_at).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell>
                        {hadith.file_size 
                          ? `${(hadith.file_size / (1024 * 1024)).toFixed(2)} MB`
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
                                window.open(hadith.file_url, "_blank");
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Lihat</span>
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
                                setSelectedHadith(hadith);
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
                    <TableCell colSpan={5} className="h-24 text-center">
                      {searchTerm ? "Tidak ada hadits yang sesuai dengan pencarian." : "Belum ada hadits yang ditambahkan."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus hadits "{selectedHadith?.title}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteHadith}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
