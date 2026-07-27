# Coquinaria App — Landing

Landing comercial de Coquinaria App (Next.js 16 · App Router · TypeScript) con la propuesta de valor: control de proveedores, costes, recetas y stock, con lectura de albaranes por IA.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

El contenido está en [components/](components/) (una sección por componente) y el orden de la página en [app/page.tsx](app/page.tsx). Los estilos (variables de color, tipografía, dark mode) están en [app/globals.css](app/globals.css).

## Antes de mandarla a un cliente

Completá el dato de contacto en [lib/site-config.ts](lib/site-config.ts) (`contactNote`), que se muestra en la sección final de la landing.

## Despliegue en Vercel

Importá este repo desde el dashboard de Vercel (Add New → Project). Next.js se detecta automáticamente, sin configuración adicional.
