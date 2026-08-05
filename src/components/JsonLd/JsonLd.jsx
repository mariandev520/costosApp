export default function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Coquinaria App',
    description:
      'Tu cocina, bajo control desde una sola pantalla. Compras, costos, recetas y stock centralizados.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    url: 'https://costos-app-pi.vercel.app',
    publisher: {
      '@type': 'Organization',
      name: 'Coquinaria App',
      url: 'https://costos-app-pi.vercel.app',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Prueba gratuita disponible',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
