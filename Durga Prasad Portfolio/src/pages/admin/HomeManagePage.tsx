import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const HomeManagePage = () => {
  const [data, setData] = useState({ id: "", title: "", subtitle: "", tagline: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("home_content").select("*").limit(1).single().then(({ data: d }) => {
      if (d) setData(d);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    const { error } = await supabase.from("home_content").update({
      title: data.title, subtitle: data.subtitle, tagline: data.tagline,
    }).eq("id", data.id);
    if (error) toast.error("Failed to save");
    else toast.success("Saved!");
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Home Section</h1>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Title</label>
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Subtitle</label>
          <Input value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Tagline</label>
          <Textarea value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} />
        </div>
        <Button onClick={save}>Save Changes</Button>
      </div>
    </div>
  );
};

export default HomeManagePage;
