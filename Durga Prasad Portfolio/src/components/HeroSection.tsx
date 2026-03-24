import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpeg";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const socials = [
  { icon: Github, href: "https://github.com/durgaprasad-mokara", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/durga-prasad-mokara/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/durgaprasad_15", label: "X" },
  { icon: Mail, href: "mailto:durgamokara15@gmail.com", label: "Email" },
];

const HeroSection = () => {
  const [content, setContent] = useState({ title: "Mokara Durga Prasad", subtitle: "Full Stack Developer & AI Engineer", tagline: "AI Agents & Automation · Prompt Engineering · NLP · LLM · Full Stack Development" });

  useEffect(() => {
    supabase.from("home_content").select("*").limit(1).single().then(({ data }) => {
      if (data) setContent({ title: data.title, subtitle: data.subtitle, tagline: data.tagline });
    });
  }, []);

  const nameParts = content.title.split(" ");
  const firstName = nameParts[0] || "";
  const rest = nameParts.slice(1).join(" ");

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} style={{ top: "10%", left: "10%" }} />
        <motion.div className="absolute w-80 h-80 rounded-full bg-accent/5 blur-3xl" animate={{ x: [0, -40, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} style={{ bottom: "10%", right: "10%" }} />
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-20">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }} className="relative">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <div className="absolute inset-0 rounded-full glow-primary animate-pulse-glow" />
            <img src={profileImg} alt={content.title} className="relative w-full h-full rounded-full object-cover border-2 border-primary/30" />
          </div>
        </motion.div>

        <div className="text-center lg:text-left max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-mono text-primary text-sm tracking-widest uppercase mb-4">{content.subtitle}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-5xl lg:text-7xl font-bold tracking-tight mb-6" style={{ textWrap: "balance" } as React.CSSProperties}>
            {firstName}{" "}<span className="text-gradient">{rest}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-muted-foreground text-lg mb-8 leading-relaxed font-mono text-sm">{content.tagline}</motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <a href="#projects" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5">Explore My Work</a>
            <a href="#contact" className="px-6 py-3 rounded-lg neon-border text-foreground font-semibold transition-all duration-300 hover:-translate-y-0.5">Contact Me</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex gap-4 justify-center lg:justify-start">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-card-hover text-muted-foreground hover:text-primary transition-colors" aria-label={s.label}>
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
