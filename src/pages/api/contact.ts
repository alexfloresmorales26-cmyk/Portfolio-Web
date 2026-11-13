import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Faltan campos requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Enviar email con Resend (si hay API key configurada)
    if (import.meta.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["alexfloresmorales211@gmail.com"],
        subject: `Nuevo mensaje de contacto de ${name}`,
        replyTo: email,
        text: `
Nombre: ${name}
Email: ${email}

Mensaje:
${message}
        `,
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
