import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Edu = Tables<"education">;

const EducationManagePage = () => {
  const [items, setItems] = useState<Edu[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ degree: "", institution: "", year: "", score: "" });

  const fetchData = async () => {
    const { data } = await supabase.from("education").select("*").order("sort_order");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const add = async () => {
    if (!form.degree || !form.institution || !form.year) return toast.error("Fill required fields");
    await supabase.from("education").insert({
      degree: form.degree, institution: form.institution, year: form.year,
      score: form.score || null, sort_order: items.length + 1,
    });
    toast.success("Added!"); setShowAdd(false); setForm({ degree: "", institution: "", year: "", score: "" }); fetchData();
  };

  const remove = async (id: string) => {
    await supabase.from("education").delete().eq("id", id);
    toast.success("Deleted!"); fetchData();
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Education</h1>
        <Button onClick={() => setShowAdd(!showAdd)}><Plus className="w-4 h-4 mr-1" /> Add</Button>
      </div>

      {showAdd && (
        <div className="glass-card p-4 mb-6 space-y-3">
          <Input placeholder="Degree" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} />
          <Input placeholder="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
          <div className="flex gap-3">
            <Input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            <Input placeholder="Score" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} />
          </div>
          <Button onClick={add}>Save</Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((e) => (
          <div key={e.id} className="glass-card p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{e.degree}</h3>
              <p className="text-sm text-muted-foreground">{e.institution} · {e.year} · {e.score}</p>
            </div>
            <Button size="icon" variant="ghost" className="text-destructive" onClick={() => remove(e.id)}><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationManagePage;
