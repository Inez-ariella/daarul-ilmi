
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminVideos } from "@/components/admin/AdminVideos";
import { AdminAudios } from "@/components/admin/AdminAudios";
import { AdminHadiths } from "@/components/admin/AdminHadiths";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminSettings } from "@/components/admin/AdminSettings";

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/videos" element={<AdminVideos />} />
        <Route path="/audios" element={<AdminAudios />} />
        <Route path="/hadiths" element={<AdminHadiths />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
