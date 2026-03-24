import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Edu = Tables<"education">;

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [education, setEducation] = useState<Edu[]>([]);

  useEffect(() => {
    supabase.from("education").select("*").order("sort_order").then(({ data }) => {
      if (data) setEducation(data);
    });
  }, []);

  return (
    <section id="education" className="py-24" ref={ref}>
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Education</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">Academic <span className="text-gradient">Foundation</span></h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
          {education.map((edu, i) => (
            <motion.div key={edu.id} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }} className="relative pl-16 pb-12 last:pb-0">
              <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-primary" />
              </div>
              <div className="glass-card p-5">
                <span className="font-mono text-xs text-primary">{edu.year}</span>
                <h3 className="font-bold text-lg mt-1">{edu.degree}</h3>
                <p className="text-muted-foreground text-sm">{edu.institution}</p>
                {edu.score && <p className="font-mono text-sm text-accent mt-1">{edu.score}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
