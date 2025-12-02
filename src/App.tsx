import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/app/page";
import CursosCatalog from "@/app/cursos/page";
import CursoDetailPage from "@/app/cursos/[id]/page";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Courses from "@/pages/admin/Courses";
import Teachers from "@/pages/admin/Teachers";
import Students from "@/pages/admin/Students";
import Resources from "@/pages/admin/Resources";
import Reports from "@/pages/admin/Reports";
import Settings from "@/pages/admin/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cursos" element={<CursosCatalog />} />
        <Route path="/cursos/:id" element={<CursoDetailPage />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="courses" element={<Courses />} />
                <Route path="teachers" element={<Teachers />} />
                <Route path="students" element={<Students />} />
                <Route path="resources" element={<Resources />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Routes>
            </AdminLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
