import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Cert = Tables<"certifications">;

const FlipCard = ({ cert, index, isInView }: { cert: Cert; index: number; isInView: boolean }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} className="perspective-[1000px] h-56 cursor-pointer" onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)} onClick={() => setFlipped(!flipped)}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }} className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 glass-card p-6 flex flex-col justify-between" style={{ backfaceVisibility: "hidden" }}>
          <div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Award className="w-6 h-6 text-primary" /></div>
            <h3 className="font-bold text-lg leading-tight">{cert.name}</h3>
            <p className="text-muted-foreground text-sm mt-1">{cert.org}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-primary">{cert.date}</span>
            <span className="text-xs text-muted-foreground">Hover to verify →</span>
          </div>
        </div>
        <div className="absolute inset-0 glass-card p-6 flex flex-col justify-between" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Credential Details</p>
            <h3 className="font-bold text-base mb-2">{cert.name}</h3>
            <p className="text-muted-foreground text-sm">Issued by: {cert.org}</p>
            <p className="font-mono text-sm text-muted-foreground mt-2">ID: {cert.credential_id}</p>
          </div>
          {cert.verify_link && cert.verify_link !== "#" && (
            <a href={cert.verify_link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <ExternalLink className="w-4 h-4" /> Verify Certificate
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [certs, setCerts] = useState<Cert[]>([]);

  useEffect(() => {
    supabase.from("certifications").select("*").order("sort_order").then(({ data }) => {
      if (data) setCerts(data);
    });
  }, []);

  return (
    <section id="certifications" className="py-24 bg-gradient-section" ref={ref}>
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Certifications</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Professional <span className="text-gradient">Credentials</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <FlipCard key={cert.id} cert={cert} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
