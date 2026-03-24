import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FolderOpen, Wrench, Award, GraduationCap, Mail } from "lucide-react";

const DashboardPage = () => {
  const [counts, setCounts] = useState({ skills: 0, projects: 0, certifications: 0, education: 0, messages: 0, unread: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [s, p, c, e, m] = await Promise.all([
        supabase.from("skills").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("certifications").select("id", { count: "exact", head: true }),
        supabase.from("education").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id, read", { count: "exact" }),
      ]);
      const unread = (m.data || []).filter((msg: any) => !msg.read).length;
      setCounts({
        skills: s.count || 0, projects: p.count || 0, certifications: c.count || 0,
        education: e.count || 0, messages: m.count || 0, unread,
      });
    };
    fetchCounts();
  }, []);

  const stats = [
    { label: "Skills", value: counts.skills, icon: Wrench },
    { label: "Projects", value: counts.projects, icon: FolderOpen },
    { label: "Certifications", value: counts.certifications, icon: Award },
    { label: "Education", value: counts.education, icon: GraduationCap },
    { label: "Messages", value: counts.messages, icon: Mail, badge: counts.unread },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
            {s.badge ? (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">{s.badge} new</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
