import { MetadataRoute } from 'next';
import { visaData } from '../data/visas';

export default function sitemap(): MetadataRoute.Sitemap {
  // Hada l-lien par défaut dyal Vercel (ghadi nbdloh mli t-khtar domaine)
  const baseUrl = 'https://ton-site.vercel.app'; 

  const countryUrls = visaData.map((visa) => ({
    url: `${baseUrl}/${visa.country}-visa-photo`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1, // L-page d'accueil hiya l-mohimma ga3
    },
    ...countryUrls,
  ];
}