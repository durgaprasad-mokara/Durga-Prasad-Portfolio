import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, Download } from "lucide-react";

const ResumePage = () => {
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    setGenerating(true);
    try {
      const [home, about, skills, projects, certs, edu] = await Promise.all([
        supabase.from("home_content").select("*").limit(1).single(),
        supabase.from("about_content").select("*").limit(1).single(),
        supabase.from("skills").select("*").order("sort_order"),
        supabase.from("projects").select("*").order("sort_order"),
        supabase.from("certifications").select("*").order("sort_order"),
        supabase.from("education").select("*").order("sort_order"),
      ]);

      const h = home.data;
      const a = about.data;
      const skillsData = skills.data || [];
      const projectsData = projects.data || [];
      const certsData = certs.data || [];
      const eduData = edu.data || [];

      // Group skills by category
      const skillGroups: Record<string, typeof skillsData> = {};
      skillsData.forEach((s) => {
        if (!skillGroups[s.category]) skillGroups[s.category] = [];
        skillGroups[s.category].push(s);
      });

      // Build HTML resume
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${h?.title || "Resume"}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',sans-serif;color:#1a1a2e;padding:40px;max-width:800px;margin:0 auto;line-height:1.5}
h1{font-size:28px;color:#0a1628;margin-bottom:4px}
h2{font-size:16px;color:#0891b2;text-transform:uppercase;letter-spacing:2px;margin:24px 0 12px;padding-bottom:6px;border-bottom:2px solid #0891b2}
h3{font-size:14px;margin-bottom:2px}
.subtitle{color:#64748b;font-size:14px;margin-bottom:4px}
.bio{color:#475569;font-size:13px;margin:12px 0}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.skill{font-size:12px;display:flex;justify-content:space-between;padding:2px 0}
.project{margin-bottom:12px}
.project h3{font-size:13px}
.project p{font-size:12px;color:#64748b}
.cert,.edu{margin-bottom:8px}
.cert h3,.edu h3{font-size:13px}
.cert p,.edu p{font-size:12px;color:#64748b}
.tags{font-size:11px;color:#0891b2}
@media print{body{padding:20px}}
</style></head><body>
<h1>${h?.title || ""}</h1>
<p class="subtitle">${h?.subtitle || ""}</p>
<p class="subtitle">${h?.tagline || ""}</p>
<p class="subtitle">Email: durgamokara15@gmail.com | Phone: 9573308774</p>
${a ? `<h2>About</h2><p class="bio">${a.bio}</p>` : ""}
<h2>Skills</h2>
<div class="grid">${Object.entries(skillGroups).map(([cat, items]) =>
  `<div><strong style="font-size:12px">${cat}</strong>${items.map((s) => `<div class="skill"><span>${s.name}</span><span>${s.level}%</span></div>`).join("")}</div>`
).join("")}</div>
<h2>Projects</h2>
${projectsData.map((p) => `<div class="project"><h3>${p.title}</h3><p>${p.description}</p><p class="tags">${p.tech.join(" · ")}</p></div>`).join("")}
<h2>Certifications</h2>
${certsData.map((c) => `<div class="cert"><h3>${c.name}</h3><p>${c.org} · ${c.date}</p></div>`).join("")}
<h2>Education</h2>
${eduData.map((e) => `<div class="edu"><h3>${e.degree}</h3><p>${e.institution} · ${e.year}${e.score ? ` · ${e.score}` : ""}</p></div>`).join("")}
</body></html>`;

      // Open print dialog
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(html);
        win.document.close();
        setTimeout(() => win.print(), 500);
      }
      toast.success("Resume generated! Use Print → Save as PDF");
    } catch {
      toast.error("Failed to generate");
    }
    setGenerating(false);
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Resume Builder</h1>
      <div className="glass-card p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-bold text-lg mb-2">Generate Resume PDF</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Automatically generates a formatted resume from your current portfolio data.
        </p>
        <Button onClick={generate} disabled={generating} size="lg">
          <Download className="w-4 h-4 mr-2" />
          {generating ? "Generating..." : "Generate & Download PDF"}
        </Button>
      </div>
    </div>
  );
};

export default ResumePage;
