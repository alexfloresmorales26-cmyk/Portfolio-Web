"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLang } from "./LangProvider";

const schema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Correo inválido"),
  message: z.string().min(10, "El mensaje es muy corto"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ t }: { t: (key: string) => string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) setStatus("success"); else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section className="py-20 px-6 max-w-2xl mx-auto">
      <div className="border-glow p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-text mb-4">{t("contact.title")}</h2>
          <p className="text-lg text-text-muted">{t("contact.subtitle")}</p>
        </div>
        {status === "success" ? (
          <div className="bg-neon-green/10 border border-neon-green/30 rounded-xl p-6 text-center"><h3 className="text-neon-green font-bold text-lg mb-2">✅ {t("contact.success")}</h3></div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {status === "error" && (<div className="bg-neon-magenta/10 border border-neon-magenta/30 rounded-xl p-4 text-center text-neon-magenta text-sm">⚠️ {t("contact.error")}</div>)}
            <div className="space-y-4"><label className="block text-sm font-medium text-text-muted">{t("contact.name")}</label><input {...register("name")} placeholder="Alejandro Flores Morales" className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all" />{errors.name && (<p className="text-xs text-neon-magenta">{errors.name.message}</p>)}</div>
            <div className="space-y-4"><label className="block text-sm font-medium text-text-muted">{t("contact.email")}</label><input {...register("email")} placeholder={t("contact.emailPlaceholder")} type="email" className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all" />{errors.email && (<p className="text-xs text-neon-magenta">{errors.email.message}</p>)}</div>
            <div className="space-y-4"><label className="block text-sm font-medium text-text-muted">{t("contact.message")}</label><textarea {...register("message")} placeholder={t("contact.messagePlaceholder")} rows="5" className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all" />{errors.message && (<p className="text-xs text-neon-magenta">{errors.message.message}</p>)}</div>
            <button type="submit" disabled={status === "sending"} className="w-full px-8 py-4 bg-neon-cyan text-bg font-bold rounded-lg hover:bg-neon-cyan/90 shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_35px_rgba(34,211,238,0.9)] transition-all disabled:opacity-60 disabled:cursor-not-allowed">{status === "sending" ? t("contact.sending") : t("contact.send")} →</button>
          </form>
        )}
      </div>
    </section>
  );
}
