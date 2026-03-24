import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AboutManagePage = () => {
  const [bio, setBio] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("about_content").select("*").limit(1).single().then(({ data }) => {
      if (data) { setBio(data.bio); setId(data.id); }
      setLoading(false);
    });
  }, []);

  const save = async () => {
    const { error } = await supabase.from("about_content").update({ bio }).eq("id", id);
    if (error) toast.error("Failed to save");
    else toast.success("Saved!");
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Edit About Section</h1>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Bio</label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={8} />
        </div>
        <Button onClick={save}>Save Changes</Button>
      </div>
    </div>
  );
};

export default AboutManagePage;
