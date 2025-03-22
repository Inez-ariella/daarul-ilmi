
import { Navbar } from "@/components/Navbar";
import { RegisterForm } from "@/components/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-md">
          <Card className="glass-card">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Daftar Akun</CardTitle>
              <CardDescription>
                Buat akun baru untuk mengakses semua fitur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="py-6 border-t border-white/10 glass">
        <div className="container">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DAARUL ILMI - Rumah Digital Tempatnya Ilmu
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
