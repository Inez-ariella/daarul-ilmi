
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { 
  Search, 
  MoreVertical, 
  UserPlus,
  Pencil, 
  Trash2, 
  UserCog,
  Lock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Mock user data
  const users = [
    {
      id: "1",
      username: "ahmad_fauzi",
      email: "ahmad@example.com",
      name: "Ahmad Fauzi",
      role: "admin",
      status: "active",
      registeredDate: "2024-01-15",
      lastActive: "2024-06-15"
    },
    {
      id: "2",
      username: "fatimah123",
      email: "fatimah@example.com",
      name: "Fatimah Azzahra",
      role: "user",
      status: "active",
      registeredDate: "2024-02-10",
      lastActive: "2024-06-14"
    },
    {
      id: "3",
      username: "umar_faruq",
      email: "umar@example.com",
      name: "Umar Faruq",
      role: "moderator",
      status: "active",
      registeredDate: "2024-03-05",
      lastActive: "2024-06-13"
    },
    {
      id: "4",
      username: "aisyah22",
      email: "aisyah@example.com",
      name: "Aisyah Rahman",
      role: "user",
      status: "suspended",
      registeredDate: "2024-04-20",
      lastActive: "2024-05-30"
    },
    {
      id: "5",
      username: "ali_imran",
      email: "ali@example.com",
      name: "Ali Imran",
      role: "user",
      status: "active",
      registeredDate: "2024-05-15",
      lastActive: "2024-06-10"
    }
  ];
  
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Pengguna</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
              <DialogDescription>
                Isi informasi untuk menambahkan pengguna baru ke perpustakaan digital.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" placeholder="Masukkan nama lengkap" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Masukkan username" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Masukkan email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Masukkan password" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Peran</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Pilih peran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="user">Pengguna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="suspended">Ditangguhkan</SelectItem>
                    </SelectContent>
                  </Select>
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
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>
            Kelola pengguna yang terdaftar di perpustakaan digital.
          </CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari pengguna..."
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
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name}
                      <div className="text-sm text-muted-foreground">@{user.username}</div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : user.role === 'moderator' ? 'secondary' : 'outline'}>
                        {user.role === 'admin' ? 'Admin' : user.role === 'moderator' ? 'Moderator' : 'Pengguna'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                        {user.status === 'active' ? 'Aktif' : 'Ditangguhkan'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.registeredDate).toLocaleDateString('id-ID')}</TableCell>
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
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>Kelola Peran</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Lock className="mr-2 h-4 w-4" />
                            <span>Reset Password</span>
                          </DropdownMenuItem>
                          {user.status === 'active' ? (
                            <DropdownMenuItem className="text-amber-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Tangguhkan</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Aktifkan</span>
                            </DropdownMenuItem>
                          )}
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
                    Tidak ada pengguna yang ditemukan.
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
