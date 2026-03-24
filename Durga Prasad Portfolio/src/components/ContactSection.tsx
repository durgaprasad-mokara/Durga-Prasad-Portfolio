import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Twitter, Mail, Phone, Facebook, ExternalLink, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/durgaprasad-mokara", handle: "durgaprasad-mokara" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/durga-prasad-mokara/", handle: "durga-prasad-mokara" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/durgaprasad_15", handle: "@durgaprasad_15" },
  { icon: ExternalLink, label: "HuggingFace", href: "https://huggingface.co/durgamokara15", handle: "durgamokara15" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/durgaprasadmo", handle: "durgaprasadmo" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("durgamokara15@gmail.com");
    toast.success("Email copied to clipboard!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please fill all fields");
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name, email: form.email, message: form.message,
    });
    if (error) toast.error("Failed to send message");
    else { toast.success("Message sent!"); setForm({ name: "", email: "", message: "" }); }
    setSending(false);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-section" ref={ref}>
      <div className="container max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Let's <span className="text-gradient">Connect</span></h2>
        </motion.div>

        {/* Contact form */}
        <motion.form initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} onSubmit={handleSubmit} className="glass-card p-6 mb-8 space-y-4 max-w-lg mx-auto">
          <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Textarea placeholder="Your Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <Button type="submit" className="w-full" disabled={sending}>
            <Send className="w-4 h-4 mr-2" />{sending ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>

        {/* Direct contact */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button onClick={copyEmail} className="glass-card-hover px-6 py-3 flex items-center gap-3 justify-center group">
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-sm">durgamokara15@gmail.com</span>
          </button>
          <a href="tel:9573308774" className="glass-card-hover px-6 py-3 flex items-center gap-3 justify-center">
            <Phone className="w-5 h-5 text-primary" />
            <span className="text-sm">9573308774</span>
          </a>
        </motion.div>

        {/* Social grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, i) => (
            <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }} className="glass-card-hover p-5 flex items-center gap-4 group">
              <link.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <p className="font-semibold text-sm">{link.label}</p>
                <p className="font-mono text-xs text-muted-foreground">{link.handle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
