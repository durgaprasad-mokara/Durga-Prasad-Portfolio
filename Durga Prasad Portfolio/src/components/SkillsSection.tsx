import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm font-mono text-primary">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${level}%` } : {}} transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))` }} />
      </div>
    </div>
  );
};

interface SkillData { id: string; category: string; name: string; level: number; sort_order: number; }

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [categories, setCategories] = useState<{ title: string; skills: SkillData[] }[]>([]);

  useEffect(() => {
    supabase.from("skills").select("*").order("sort_order").then(({ data }) => {
      if (!data) return;
      const groups: Record<string, SkillData[]> = {};
      data.forEach((s) => {
        if (!groups[s.category]) groups[s.category] = [];
        groups[s.category].push(s);
      });
      setCategories(Object.entries(groups).map(([title, skills]) => ({ title, skills })));
    });
  }, []);

  return (
    <section id="skills" className="py-24" ref={ref}>
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Skills</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">Technical <span className="text-gradient">Arsenal</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, ci) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: ci * 0.15 }} className="glass-card p-6">
              <h3 className="font-semibold text-lg mb-5 font-mono text-primary/90">{cat.title}</h3>
              {cat.skills.map((skill, si) => (
                <SkillBar key={skill.id} name={skill.name} level={skill.level} delay={0.3 + si * 0.1} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
