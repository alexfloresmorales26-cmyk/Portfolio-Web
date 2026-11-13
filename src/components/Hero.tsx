"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangProvider";

interface HeroProps { t: (key: string) => string; locale: "es" | "en"; }

export function Hero({ t, locale }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const welcome = t("hero.welcome");
  const intro = t("hero.intro");
  const subtitle = t("hero.subtitle");

  return (
    <section ref={heroRef} className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 border border-neon-cyan/30 rounded animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 border border-neon-magenta/30 rounded animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-neon-green/30 rounded animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-extrabold text-text tracking-tight">
          {welcome.split("").map((char, i) => (
            <motion.span key={i} className="hero-bounce-letter" initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.5, delay: i * 0.06, ease: [0.17, 0.67, 0.83, 1], type: "spring", stiffness: 400, damping: 15 }}>
              {char}
            </motion.span>
          ))}
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-neon-cyan tracking-wide">{intro}</h2>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/es/contacto" className="px-8 py-3 bg-neon-cyan text-bg font-bold rounded-full hover:bg-neon-cyan/90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]">{t("hero.hire")}</a>
          <a href="#" className="px-8 py-3 border border-border text-text rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-all">{t("hero.downloadCv")}</a>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4 text-text-muted text-sm">
          {["github", "linkedin", "twitter"].map((network) => (
            <a key={network} href={`https://${network}.com/alejandroflores`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-surface-hover hover:border-neon-cyan transition-all">
              {network === "github" ? (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-1.285-.255-2.6-1.042-2.6-1.042-2.15-1.486.002-1.475-.002-1.475 1.563 0 1.122 0 1.122 0 1.122 1.32 0 2.015 1.147 2.015 1.147.894 1.396 2.328 1.045 2.328 1.045 1.27-.885 1.91-1.32 1.91-1.32 1.61.312 3.276.743 3.276.743 2.226 1.606 5.44 1.106 6.582.92.493-.496.754-1.202.754-1.202 1.126-.225 1.976.76 1.976.76 0 1.115 0 2.006 0 2.006.515 1.513 1.752 2.136 2.725 2.136 0 .587-.03 1.056-.08 1.334 1.063.224 2.307.353 3.803.353 1.474 0 2.74-.229 3.802-.353-.05-.278-.08-.747-.08-1.334 0-.971.407-1.938 1.106-2.648.693-.493 1.338-.996 1.338-.996 1.005-.074 2.454-.382 2.454-.382-.043-.634-.23-1.346-.586-1.844.244-.187.552-.865.552-.865 1.457-.178 2.531-1.04 2.531-1.04-.333-.772-.776-1.283-1.333-1.585-.607-.19-1.243-.29-1.902-.29-1.464 0-2.657 1.143-2.657 2.557 0 .223.013.437.032.656.822.37 1.594.585 2.442.585 0 .285-.01.57-.015.855 0 1.61-.015 2.948-.015 3.342 0 .765-.751 1.225-1.384.765-1.55-.318-2.395-1.418-2.395-1.418-1.12-.747-1.637-1.274-1.637-1.274-.09-.412-.202-.798-.33-1.177C8.52 10.09 5.75 9.16 4.96 8.36c-.25-.402-.4-.742-.4-1.085 0-.358.132-.694.356-.96.34-.405 1.015-.957 1.015-.957.05.515.035.975.035.975.26 1.335 1.025 2.395 2.005 2.575.105.165.145.375.145.595 0 .505-.015.945-.015 1.41 0 .318.223.633.824.576 4.765-1.585 8.205-6.085 8.205-11.385C24 5.373 18.626 0 12 0z" /></svg>) : network === "linkedin" ? (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>) : (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.348 5.263c-.602-.587-1.41-.92-2.258-.92h-5.834c-.848 0-1.655.332-2.257.919-.599.59-.934 1.389-.934 2.24v5.833c0 .851.335 1.65.933 2.241.602.586 1.409.92 2.258.92h5.834c.849 0 1.657-.334 2.257-.92.598-.591.933-1.39.933-2.241V7.503c0-.851-.335-1.65-.934-2.24zm-3.138 6.767c-.638-.586-1.543-.712-2.118-.712-.576 0-1.482.126-2.12.711-.478.44-.741 1.03-.741 1.717 0 .686.264 1.277.742 1.717.638.585 1.544.711 2.12.711s1.482-.126 2.118-.711c.477-.44.741-1.031.741-1.717 0-.687-.264-1.277-.742-1.717zM6.613 14.53c-.638-.585-1.543-.711-2.118-.711-.576 0-1.482.126-2.12.711-.477.44-.741 1.03-.741 1.717 0 .686.264 1.277.741 1.717.638.585 1.544.711 2.12.711s1.482-.126 2.118-.711c.477-.44.741-1.031.741-1.717 0-.687-.264-1.277-.742-1.717zm11.246-4.058c0-4.886-3.968-8.855-8.855-8.855-4.888 0-8.855 3.969-8.855 8.855 0 4.887 3.967 8.855 8.855 8.855 4.887 0 8.855-3.968 8.855-8.855z" /></svg>)}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
