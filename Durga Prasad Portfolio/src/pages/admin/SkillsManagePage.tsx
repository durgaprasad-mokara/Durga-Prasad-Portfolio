import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Skill = Tables<"skills">;

const SkillsManagePage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState({ category: "", name: "", level: 50 });

  const fetch = async () => {
    const { data } = await supabase.from("skills").select("*").order("sort_order");
    setSkills(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const add = async () => {
    if (!newSkill.name || !newSkill.category) return toast.error("Fill in all fields");
    const { error } = await supabase.from("skills").insert({
      category: newSkill.category, name: newSkill.name, level: newSkill.level,
      sort_order: skills.length + 1,
    });
    if (error) toast.error("Failed to add");
    else { toast.success("Added!"); setNewSkill({ category: "", name: "", level: 50 }); fetch(); }
  };

  const update = async (skill: Skill) => {
    const { error } = await supabase.from("skills").update({
      category: skill.category, name: skill.name, level: skill.level,
    }).eq("id", skill.id);
    if (error) toast.error("Failed"); else toast.success("Updated!");
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) toast.error("Failed"); else { toast.success("Deleted!"); fetch(); }
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Skills</h1>

      {/* Add new */}
      <div className="glass-card p-4 mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs font-medium mb-1 block">Category</label>
          <Input value={newSkill.category} onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })} placeholder="e.g. Frontend" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs font-medium mb-1 block">Skill Name</label>
          <Input value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} placeholder="e.g. React.js" />
        </div>
        <div className="w-24">
          <label className="text-xs font-medium mb-1 block">Level %</label>
          <Input type="number" min={0} max={100} value={newSkill.level} onChange={(e) => setNewSkill({ ...newSkill, level: +e.target.value })} />
        </div>
        <Button onClick={add} size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {skills.map((s) => (
          <div key={s.id} className="glass-card p-3 flex flex-wrap gap-2 items-center">
            <Input className="flex-1 min-w-[120px]" value={s.category} onChange={(e) => setSkills(skills.map((sk) => sk.id === s.id ? { ...sk, category: e.target.value } : sk))} />
            <Input className="flex-1 min-w-[120px]" value={s.name} onChange={(e) => setSkills(skills.map((sk) => sk.id === s.id ? { ...sk, name: e.target.value } : sk))} />
            <Input className="w-20" type="number" min={0} max={100} value={s.level} onChange={(e) => setSkills(skills.map((sk) => sk.id === s.id ? { ...sk, level: +e.target.value } : sk))} />
            <Button size="icon" variant="ghost" onClick={() => update(s)}><Save className="w-4 h-4" /></Button>
            <Button size="icon" variant="ghost" className="text-destructive" onClick={() => remove(s.id)}><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManagePage;
