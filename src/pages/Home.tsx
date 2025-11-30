import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import CourseList from "@/components/CourseList";
import { HOME_DATA } from "@/mocks/home-data";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        data={HOME_DATA.hero}
        onCTAClick={() => navigate("/admin/dashboard")}
      />

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Cursos destacados
          </h2>
          <p className="mt-1 text-gray-600">
            Explora algunos de nuestros cursos más populares.
          </p>
        </div>
        <div className="mt-6">
          <CourseList courses={HOME_DATA.courses} />
        </div>
      </section>
    </div>
  );
}
