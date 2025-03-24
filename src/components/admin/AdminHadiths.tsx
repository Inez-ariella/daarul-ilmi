
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

// Define the form schema
const hadithFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().optional(),
  source: z.string().optional(),
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
  source?: string;
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
      source: "",
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
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .eq('file_type', 'application/pdf')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setHadiths(data || []);
    } catch (err: any) {
      console.error('Error fetching hadiths:', err);
      setError(err.message || 'An error occurred while fetching hadith files');
      toast({
        variant: "destructive",
        title: "Error fetching hadith files",
        description: err.message || 'An error occurred while fetching hadith files',
      });
    } finally {
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
      // Insert the new hadith record
      const { data, error } = await supabase
        .from('media_files')
        .insert([{
          title: values.title,
          description: values.description,
          file_url: values.file_url,
          thumbnail_url: values.thumbnail_url || null,
          file_type: values.file_type,
          file_size: values.file_size,
          category: values.category || null,
          source: values.source || null
        }])
        .select();
      
      if (error) {
        throw error;
      }
      
      // Reset form and close the dialog
      form.reset();
      setIsAddDialogOpen(false);
      
      // Update the hadith list
      fetchHadiths();
      
      toast({
        title: "Hadith document added successfully",
        description: `${values.title} has been added to the hadith collection.`,
      });
    } catch (err: any) {
      console.error('Error adding hadith:', err);
      toast({
        variant: "destructive",
        title: "Error adding hadith document",
        description: err.message || 'An error occurred while adding the hadith document',
      });
    }
  };

  // Handle hadith deletion
  const handleDeleteHadith = async () => {
    if (!selectedHadith) return;
    
    try {
      // Delete the hadith record
      const { error } = await supabase
        .from('media_files')
        .delete()
        .eq('id', selectedHadith.id);
      
      if (error) {
        throw error;
      }
      
      // Extract the file path from the URL
      const fileUrl = new URL(selectedHadith.file_url);
      const filePath = fileUrl.pathname.split('/').pop();
      
      if (filePath) {
        // Delete the file from storage
        const { error: storageError } = await supabase.storage
          .from('media-files')
          .remove([filePath]);
        
        if (storageError) {
          console.error('Error deleting file from storage:', storageError);
        }
      }
      
      // Close the dialog and reset the selected hadith
      setIsDeleteDialogOpen(false);
      setSelectedHadith(null);
      
      // Update the hadith list
      fetchHadiths();
      
      toast({
        title: "Hadith document deleted successfully",
        description: `${selectedHadith.title} has been removed from the hadith collection.`,
      });
    } catch (err: any) {
      console.error('Error deleting hadith:', err);
      toast({
        variant: "destructive",
        title: "Error deleting hadith document",
        description: err.message || 'An error occurred while deleting the hadith document',
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
              <DialogTitle>Tambah Dokumen Hadits Baru</DialogTitle>
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
                    <FormLabel>File PDF</FormLabel>
                    <FileUploader 
                      onUploadComplete={handleFileUploadComplete}
                      acceptedFileTypes="application/pdf"
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
                      name="source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sumber</FormLabel>
                          <FormControl>
                            <Input placeholder="Sumber hadits" {...field} />
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
                            <Input placeholder="Kategori hadits" {...field} />
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
          <CardTitle>Daftar Hadits</CardTitle>
          <CardDescription>
            Kelola semua dokumen hadits yang tersedia di perpustakaan digital.
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
                  <TableHead>Sumber</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Ukuran</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHadiths.length > 0 ? (
                  filteredHadiths.map((hadith) => (
                    <TableRow key={hadith.id}>
                      <TableCell className="font-medium">{hadith.title}</TableCell>
                      <TableCell>{hadith.source || "N/A"}</TableCell>
                      <TableCell>
                        {new Date(hadith.created_at).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell>{hadith.category || "N/A"}</TableCell>
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
                                // Edit functionality would go here
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
                    <TableCell colSpan={6} className="h-24 text-center">
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
