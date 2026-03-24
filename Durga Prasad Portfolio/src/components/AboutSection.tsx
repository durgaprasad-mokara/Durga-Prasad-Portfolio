import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Brain, Code2, Cpu, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = { Brain, Code2, Cpu, Sparkles };

const defaultHighlights = [
  { icon: "Brain", label: "AI & ML", desc: "NLP, LLMs, Prompt Engineering" },
  { icon: "Cpu", label: "Automation", desc: "AI Agents & Chatbot Systems" },
  { icon: "Code2", label: "Full Stack", desc: "React, Node.js, REST APIs" },
  { icon: "Sparkles", label: "Innovation", desc: "Scalable & Intelligent Solutions" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [bio, setBio] = useState("");
  const [highlights, setHighlights] = useState(defaultHighlights);

  useEffect(() => {
    supabase.from("about_content").select("*").limit(1).single().then(({ data }) => {
      if (data) {
        setBio(data.bio);
        const h = data.highlights as any[];
        if (Array.isArray(h) && h.length > 0) setHighlights(h);
      }
    });
  }, []);

  return (
    <section id="about" className="py-24 bg-gradient-section" ref={ref}>
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-8" style={{ textWrap: "balance" } as React.CSSProperties}>
            Building the future with <span className="text-gradient">AI & Code</span>
          </h2>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-3xl">
          {bio}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} className="glass-card-hover p-6 text-center">
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
