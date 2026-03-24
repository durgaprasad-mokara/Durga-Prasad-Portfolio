import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <EducationSection />
      <ContactSection />
      
      <footer className="py-8 border-t border-border flex items-center justify-between px-6">
        <p className="text-sm text-muted-foreground">
          © 2026 Mokara Durga Prasad. Building intelligent systems with passion.
        </p>
        <Link
          to="/admin/login"
          className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
        >
          Admin
        </Link>
      </footer>
    </div>
  );
};

export default Index;
