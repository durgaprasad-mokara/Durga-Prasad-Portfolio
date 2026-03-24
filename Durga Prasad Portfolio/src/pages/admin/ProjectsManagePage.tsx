import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Project = Tables<"projects">;

const ProjectsManagePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "Full Stack", tech: "", github_url: "", live_url: "" });

  const fetchData = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const add = async () => {
    if (!form.title || !form.description) return toast.error("Fill required fields");
    const { error } = await supabase.from("projects").insert({
      title: form.title, description: form.description, category: form.category,
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
      github_url: form.github_url || null, live_url: form.live_url || null,
      sort_order: projects.length + 1,
    });
    if (error) toast.error("Failed"); else { toast.success("Added!"); setShowAdd(false); setForm({ title: "", description: "", category: "Full Stack", tech: "", github_url: "", live_url: "" }); fetchData(); }
  };

  const remove = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    toast.success("Deleted!"); fetchData();
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Button onClick={() => setShowAdd(!showAdd)}><Plus className="w-4 h-4 mr-1" /> Add Project</Button>
      </div>

      {showAdd && (
        <div className="glass-card p-4 mb-6 space-y-3">
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="flex gap-3 flex-wrap">
            <Input className="flex-1" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Input className="flex-1" placeholder="Tech (comma-separated)" value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Input className="flex-1" placeholder="GitHub URL" value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} />
            <Input className="flex-1" placeholder="Live URL" value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} />
          </div>
          <Button onClick={add}>Save Project</Button>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="glass-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.category} · {p.tech.join(", ")}</p>
                <p className="text-sm mt-1">{p.description}</p>
              </div>
              <Button size="icon" variant="ghost" className="text-destructive" onClick={() => remove(p.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManagePage;
