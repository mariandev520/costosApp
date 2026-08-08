export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://costos-app-pi.vercel.app/sitemap.xml',
  }
}
