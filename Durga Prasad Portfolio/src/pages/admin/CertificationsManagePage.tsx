import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Cert = Tables<"certifications">;

const CertificationsManagePage = () => {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", date: "", credential_id: "", verify_link: "" });

  const fetchData = async () => {
    const { data } = await supabase.from("certifications").select("*").order("sort_order");
    setCerts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const add = async () => {
    if (!form.name || !form.org || !form.date) return toast.error("Fill required fields");
    await supabase.from("certifications").insert({
      name: form.name, org: form.org, date: form.date,
      credential_id: form.credential_id || null, verify_link: form.verify_link || null,
      sort_order: certs.length + 1,
    });
    toast.success("Added!"); setShowAdd(false); setForm({ name: "", org: "", date: "", credential_id: "", verify_link: "" }); fetchData();
  };

  const remove = async (id: string) => {
    await supabase.from("certifications").delete().eq("id", id);
    toast.success("Deleted!"); fetchData();
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Certifications</h1>
        <Button onClick={() => setShowAdd(!showAdd)}><Plus className="w-4 h-4 mr-1" /> Add</Button>
      </div>

      {showAdd && (
        <div className="glass-card p-4 mb-6 space-y-3">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Organization" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
          <div className="flex gap-3">
            <Input placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Input placeholder="Credential ID" value={form.credential_id} onChange={(e) => setForm({ ...form, credential_id: e.target.value })} />
          </div>
          <Input placeholder="Verify Link" value={form.verify_link} onChange={(e) => setForm({ ...form, verify_link: e.target.value })} />
          <Button onClick={add}>Save</Button>
        </div>
      )}

      <div className="space-y-2">
        {certs.map((c) => (
          <div key={c.id} className="glass-card p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.org} · {c.date}</p>
            </div>
            <Button size="icon" variant="ghost" className="text-destructive" onClick={() => remove(c.id)}><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsManagePage;
