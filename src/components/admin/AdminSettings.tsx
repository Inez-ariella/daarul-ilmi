
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Upload, 
  Globe, 
  Bell, 
  Lock, 
  Mail, 
  Shield
} from "lucide-react";

export const AdminSettings = () => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "Perpustakaan Digital Al-Muflihun",
    siteDescription: "Platform digital untuk meningkatkan aksesibilitas santri dan pengajar terhadap sumber-sumber kajian keislaman.",
    contactEmail: "perpustakaan@almuflihun.ac.id",
    enableRegistration: true,
    requireEmailVerification: true,
    enableComments: true,
    enableRatings: true,
    enableNotifications: true,
    maintenanceMode: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSiteSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    // Save settings to database or API
    console.log("Settings saved:", siteSettings);
    // Show toast notification
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pengaturan</h1>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="appearance">Tampilan</TabsTrigger>
          <TabsTrigger value="users">Pengguna</TabsTrigger>
          <TabsTrigger value="emails">Email</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>
                Konfigurasi dasar untuk perpustakaan digital Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Nama Situs</Label>
                <Input 
                  id="site-name" 
                  name="siteName"
                  value={siteSettings.siteName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="site-description">Deskripsi Situs</Label>
                <Textarea 
                  id="site-description" 
                  name="siteDescription"
                  value={siteSettings.siteDescription}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email Kontak</Label>
                <Input 
                  id="contact-email" 
                  name="contactEmail"
                  value={siteSettings.contactEmail}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="logo">Logo Situs</Label>
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 border rounded flex items-center justify-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="Logo" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <Button type="button" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Unggah Logo
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="favicon">Favicon</Label>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 border rounded flex items-center justify-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="Favicon" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <Button type="button" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Unggah Favicon
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode" className="text-base">Mode Pemeliharaan</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan mode pemeliharaan saat melakukan update sistem.
                  </p>
                </div>
                <Switch
                  id="maintenance-mode"
                  checked={siteSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleSwitchChange('maintenanceMode', checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Tampilan</CardTitle>
              <CardDescription>
                Kustomisasi tampilan perpustakaan digital Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Tema Warna</Label>
                <div className="flex flex-wrap gap-2">
                  {['primary', 'orange', 'green', 'blue', 'purple'].map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full bg-${color === 'primary' ? 'primary' : color}-500 cursor-pointer ring-2 ring-offset-2 ${color === 'primary' ? 'ring-primary' : 'ring-transparent'}`}
                      aria-label={`${color} theme`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Mode Tampilan</Label>
                <div className="flex gap-4">
                  <div className="flex flex-1 items-center space-x-2">
                    <button
                      className="flex-1 rounded-md border p-2 ring-2 ring-primary"
                    >
                      <div className="h-20 bg-white rounded-md"></div>
                      <p className="mt-1 text-center text-sm">Terang</p>
                    </button>
                  </div>
                  <div className="flex flex-1 items-center space-x-2">
                    <button
                      className="flex-1 rounded-md border p-2"
                    >
                      <div className="h-20 bg-gray-900 rounded-md"></div>
                      <p className="mt-1 text-center text-sm">Gelap</p>
                    </button>
                  </div>
                  <div className="flex flex-1 items-center space-x-2">
                    <button
                      className="flex-1 rounded-md border p-2"
                    >
                      <div className="h-20 bg-gradient-to-b from-white to-gray-900 rounded-md"></div>
                      <p className="mt-1 text-center text-sm">Sistem</p>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Tata Letak Beranda</Label>
                <div className="flex gap-4">
                  <div className="flex flex-1 items-center space-x-2">
                    <button
                      className="flex-1 rounded-md border p-2 ring-2 ring-primary"
                    >
                      <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
                        <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 mb-1 rounded"></div>
                        <div className="grid grid-cols-3 gap-1 h-12">
                          <div className="bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </div>
                      <p className="mt-1 text-center text-sm">Grid</p>
                    </button>
                  </div>
                  <div className="flex flex-1 items-center space-x-2">
                    <button
                      className="flex-1 rounded-md border p-2"
                    >
                      <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
                        <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 mb-1 rounded"></div>
                        <div className="space-y-1 h-12">
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </div>
                      <p className="mt-1 text-center text-sm">Daftar</p>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Font</Label>
                <div className="flex gap-4">
                  <div className="flex flex-1 items-center space-x-2">
                    <button
                      className="flex-1 rounded-md border p-2 ring-2 ring-primary"
                    >
                      <div className="h-12 flex items-center justify-center font-sans">
                        Aa
                      </div>
                      <p className="mt-1 text-center text-sm">Sans</p>
                    </button>
                  </div>
                  <div className="flex flex-1 items-center space-x-2">
                    <button
                      className="flex-1 rounded-md border p-2"
                    >
                      <div className="h-12 flex items-center justify-center font-serif">
                        Aa
                      </div>
                      <p className="mt-1 text-center text-sm">Serif</p>
                    </button>
                  </div>
                  <div className="flex flex-1 items-center space-x-2">
                    <button
                      className="flex-1 rounded-md border p-2"
                    >
                      <div className="h-12 flex items-center justify-center font-mono">
                        Aa
                      </div>
                      <p className="mt-1 text-center text-sm">Mono</p>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Users Settings */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Pengguna</CardTitle>
              <CardDescription>
                Konfigurasi pendaftaran dan pengelolaan pengguna.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-registration" className="text-base">Pendaftaran Pengguna</Label>
                  <p className="text-sm text-muted-foreground">
                    Izinkan pengguna baru mendaftar ke perpustakaan digital.
                  </p>
                </div>
                <Switch
                  id="enable-registration"
                  checked={siteSettings.enableRegistration}
                  onCheckedChange={(checked) => handleSwitchChange('enableRegistration', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-verification" className="text-base">Verifikasi Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Haruskan pengguna memverifikasi email saat mendaftar.
                  </p>
                </div>
                <Switch
                  id="email-verification"
                  checked={siteSettings.requireEmailVerification}
                  onCheckedChange={(checked) => handleSwitchChange('requireEmailVerification', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label htmlFor="default-user-role">Peran Pengguna Default</Label>
                <select
                  id="default-user-role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="user">Pengguna</option>
                  <option value="contributor">Kontributor</option>
                </select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-comments" className="text-base">Komentar Pengguna</Label>
                  <p className="text-sm text-muted-foreground">
                    Izinkan pengguna memberikan komentar pada konten.
                  </p>
                </div>
                <Switch
                  id="enable-comments"
                  checked={siteSettings.enableComments}
                  onCheckedChange={(checked) => handleSwitchChange('enableComments', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-ratings" className="text-base">Rating Pengguna</Label>
                  <p className="text-sm text-muted-foreground">
                    Izinkan pengguna memberikan rating pada konten.
                  </p>
                </div>
                <Switch
                  id="enable-ratings"
                  checked={siteSettings.enableRatings}
                  onCheckedChange={(checked) => handleSwitchChange('enableRatings', checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Emails Settings */}
        <TabsContent value="emails">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Email</CardTitle>
              <CardDescription>
                Konfigurasi notifikasi email dan template.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Konfigurasi SMTP</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-host">SMTP Host</Label>
                      <Input 
                        id="smtp-host" 
                        placeholder="smtp.yourdomain.com" 
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input 
                        id="smtp-port" 
                        placeholder="587" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-username">SMTP Username</Label>
                      <Input 
                        id="smtp-username" 
                        placeholder="username@yourdomain.com" 
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-password">SMTP Password</Label>
                      <Input 
                        id="smtp-password" 
                        type="password"
                        placeholder="••••••••" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Label htmlFor="smtp-encryption">Gunakan Enkripsi TLS</Label>
                    <Switch id="smtp-encryption" defaultChecked />
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline">
                      Kirim Email Uji
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Template Email</h3>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="welcome-email">Email Selamat Datang</Label>
                        <Button variant="outline" size="sm">
                          Edit Template
                        </Button>
                      </div>
                      <div className="rounded-md border p-4 bg-gray-50 dark:bg-gray-900">
                        <p className="text-sm text-muted-foreground">Dikirim ke pengguna baru setelah mendaftar.</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="verification-email">Email Verifikasi</Label>
                        <Button variant="outline" size="sm">
                          Edit Template
                        </Button>
                      </div>
                      <div className="rounded-md border p-4 bg-gray-50 dark:bg-gray-900">
                        <p className="text-sm text-muted-foreground">Dikirim ke pengguna untuk memverifikasi alamat email mereka.</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-reset-email">Email Reset Password</Label>
                        <Button variant="outline" size="sm">
                          Edit Template
                        </Button>
                      </div>
                      <div className="rounded-md border p-4 bg-gray-50 dark:bg-gray-900">
                        <p className="text-sm text-muted-foreground">Dikirim ke pengguna yang meminta reset password.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-notifications" className="text-base">Notifikasi Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi email tentang konten baru dan aktivitas.
                    </p>
                  </div>
                  <Switch
                    id="enable-notifications"
                    checked={siteSettings.enableNotifications}
                    onCheckedChange={(checked) => handleSwitchChange('enableNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Keamanan</CardTitle>
              <CardDescription>
                Konfigurasi keamanan dan izin untuk perpustakaan digital Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Autentikasi</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Otentikasi Dua Faktor</Label>
                    <p className="text-sm text-muted-foreground">
                      Haruskan admin menggunakan otentikasi 2FA.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="login-attempts">Batas Percobaan Login</Label>
                  <Input 
                    id="login-attempts" 
                    defaultValue="5"
                  />
                  <p className="text-sm text-muted-foreground">
                    Jumlah maksimum percobaan login sebelum akun dikunci.
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="session-timeout">Batas Waktu Sesi (menit)</Label>
                  <Input 
                    id="session-timeout" 
                    defaultValue="60"
                  />
                  <p className="text-sm text-muted-foreground">
                    Waktu maksimum sebelum pengguna harus login kembali.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Izin Upload Konten</h3>
                
                <div className="grid gap-2">
                  <Label htmlFor="allowed-file-types">Tipe File yang Diizinkan</Label>
                  <Input 
                    id="allowed-file-types" 
                    defaultValue=".mp4, .mp3, .pdf, .jpg, .png"
                  />
                  <p className="text-sm text-muted-foreground">
                    Format file yang diizinkan untuk diunggah (pisahkan dengan koma).
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="max-file-size">Ukuran File Maksimum (MB)</Label>
                  <Input 
                    id="max-file-size" 
                    defaultValue="50"
                  />
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Moderasi Konten</Label>
                    <p className="text-sm text-muted-foreground">
                      Tinjau konten baru sebelum dipublikasikan.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Cadangan & Pemulihan</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Cadangan Otomatis</Label>
                    <p className="text-sm text-muted-foreground">
                      Buat cadangan otomatis database secara berkala.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="backup-frequency">Frekuensi Cadangan</Label>
                  <select
                    id="backup-frequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="backup-retention">Retensi Cadangan (hari)</Label>
                  <Input 
                    id="backup-retention" 
                    defaultValue="30"
                  />
                  <p className="text-sm text-muted-foreground">
                    Berapa lama cadangan disimpan sebelum dihapus otomatis.
                  </p>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline">
                    Buat Cadangan Manual
                  </Button>
                  <Button variant="outline">
                    Pulihkan dari Cadangan
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
