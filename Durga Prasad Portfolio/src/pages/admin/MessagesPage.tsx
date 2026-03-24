import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Check } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Msg = Tables<"contact_messages">;

const MessagesPage = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("contact_messages").update({ read: true }).eq("id", id);
    fetchData();
  };

  const remove = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    toast.success("Deleted!"); fetchData();
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      {messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`glass-card p-4 ${!m.read ? "border-l-4 border-l-primary" : ""}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{m.name} <span className="text-muted-foreground font-normal text-sm">({m.email})</span></p>
                  <p className="text-sm mt-1">{m.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(m.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-1">
                  {!m.read && (
                    <Button size="icon" variant="ghost" onClick={() => markRead(m.id)}><Check className="w-4 h-4" /></Button>
                  )}
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => remove(m.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
