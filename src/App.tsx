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
import StudentLayout from "@/pages/student/StudentLayout";
import StudentDashboard from "@/pages/student/Dashboard";
import Resumen from "@/pages/student/Resumen";
import Horario from "@/pages/student/Horario";
import Materiales from "@/pages/student/Materiales";
import Evaluaciones from "@/pages/student/Evaluaciones";
import Pagos from "@/pages/student/Pagos";
import Certificados from "@/pages/student/Certificados";
import TeacherLayout from "@/pages/teacher/TeacherLayout";
import TeacherResumen from "@/pages/teacher/Resumen";
import TeacherHorario from "@/pages/teacher/Horario";
import TeacherAsistencia from "@/pages/teacher/Asistencia";
import TeacherMateriales from "@/pages/teacher/Materiales";
import TeacherEvaluaciones from "@/pages/teacher/Evaluaciones";
import TeacherCalificaciones from "@/pages/teacher/Calificaciones";
import UpdatePasswordPage from "@/pages/UpdatePassword";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
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
        <Route path="/estudiante" element={<Navigate to="/estudiante/resumen" replace />} />
        <Route
          path="/estudiante/*"
          element={
            <StudentLayout>
              <Routes>
                <Route path="" element={<StudentDashboard />} />
                <Route path="resumen" element={<Resumen />} />
                <Route path="horario" element={<Horario />} />
                <Route path="materiales" element={<Materiales />} />
                <Route path="evaluaciones" element={<Evaluaciones />} />
                <Route path="pagos" element={<Pagos />} />
                <Route path="certificados" element={<Certificados />} />
              </Routes>
            </StudentLayout>
          }
        />
        <Route path="/profesor" element={<Navigate to="/profesor/resumen" replace />} />
        <Route
          path="/profesor/*"
          element={
            <TeacherLayout>
              <Routes>
                <Route path="resumen" element={<TeacherResumen />} />
                <Route path="horario" element={<TeacherHorario />} />
                <Route path="asistencia" element={<TeacherAsistencia />} />
                <Route path="materiales" element={<TeacherMateriales />} />
                <Route path="evaluaciones" element={<TeacherEvaluaciones />} />
                <Route path="calificaciones" element={<TeacherCalificaciones />} />
              </Routes>
            </TeacherLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
