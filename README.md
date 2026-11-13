# Portfolio Web — Alejandro Flores Morales

Portafolio personal desarrollado con **Astro 7.4.11**, **Tailwind CSS v4**, **Framer Motion**, **React**, **MDX** y **Resend**.

## Stack

- Astro 7.4.11
- Tailwind CSS v4 (@tailwindcss/vite)
- Framer Motion
- React islands
- MDX blog con Shiki (sintaxis resaltada)
- react-hook-form + zod + Resend (formulario de contacto)
- i18n: es / en (routing /es/ y /en/)
- SEO: Open Graph, Twitter Cards, JSON-LD, sitemap, RSS

## Estilo

- Fondo oscuro con acentos neón (cyan, magenta, green)
- Fuentes: Space Grotesk (display) + JetBrains Mono (código/UI)
- Cards con borde glow/neón animado
- Hero con bounce scroll-triggered

## Desarrollo

```bash
npm install
npm run dev      # astro dev --background (según AGENTS.md)
npm run build
npm run preview
```

Nota: Astro 7.4.11 requiere Node >=22.23.4. Si usas Node 22.22.x, el binario de astro bloquea el arranque; despliega en un entorno con Node compatible (Vercel, Cloudflare Pages, GitHub Actions).

## Despliegue

Conecta este repo a Vercel o Cloudflare Pages. Asegúrate de definir `RESEND_API_KEY` para el formulario de contacto.

## Repositorio

https://github.com/alexfloresmorales26-cmyk/Portfolio-Web.git
