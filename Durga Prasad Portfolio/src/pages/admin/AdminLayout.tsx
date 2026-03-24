import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { Home, User, Wrench, FolderOpen, Award, GraduationCap, Mail, LogOut, FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Dashboard", icon: Home, path: "/admin" },
  { label: "Home", icon: Home, path: "/admin/home" },
  { label: "About", icon: User, path: "/admin/about" },
  { label: "Skills", icon: Wrench, path: "/admin/skills" },
  { label: "Projects", icon: FolderOpen, path: "/admin/projects" },
  { label: "Certifications", icon: Award, path: "/admin/certifications" },
  { label: "Education", icon: GraduationCap, path: "/admin/education" },
  { label: "Messages", icon: Mail, path: "/admin/messages" },
  { label: "Resume", icon: FileText, path: "/admin/resume" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-destructive font-semibold">Access denied. Admin only.</p></div>;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-50 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <img src={logo} alt="MDP Logo" className="h-[30px] w-auto object-contain" />
            <span>Admin</span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={signOut}>
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center px-4 gap-3 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="font-semibold text-sm truncate">
            {navItems.find((n) => n.path === location.pathname)?.label || "Admin"}
          </h2>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
