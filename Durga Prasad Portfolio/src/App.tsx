import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import DashboardPage from "./pages/admin/DashboardPage.tsx";
import HomeManagePage from "./pages/admin/HomeManagePage.tsx";
import AboutManagePage from "./pages/admin/AboutManagePage.tsx";
import SkillsManagePage from "./pages/admin/SkillsManagePage.tsx";
import ProjectsManagePage from "./pages/admin/ProjectsManagePage.tsx";
import CertificationsManagePage from "./pages/admin/CertificationsManagePage.tsx";
import EducationManagePage from "./pages/admin/EducationManagePage.tsx";
import MessagesPage from "./pages/admin/MessagesPage.tsx";
import ResumePage from "./pages/admin/ResumePage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="home" element={<HomeManagePage />} />
                <Route path="about" element={<AboutManagePage />} />
                <Route path="skills" element={<SkillsManagePage />} />
                <Route path="projects" element={<ProjectsManagePage />} />
                <Route path="certifications" element={<CertificationsManagePage />} />
                <Route path="education" element={<EducationManagePage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="resume" element={<ResumePage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
