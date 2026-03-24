import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Project = Tables<"projects">;

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    supabase.from("projects").select("*").order("sort_order").then(({ data }) => {
      if (data) setProjects(data);
    });
  }, []);

  return (
    <section id="projects" className="py-24 bg-gradient-section" ref={ref}>
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Projects</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">Featured <span className="text-gradient">Work</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} className="glass-card-hover p-6 group">
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-xs text-primary/70 px-2 py-1 rounded-md bg-primary/10">{project.category}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" /></a>}
                  {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" /></a>}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
