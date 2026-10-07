import type { MetadataRoute } from 'next';
import portfolioData from '@/data/portfolio.json';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://subharup.com';
  const lastModified = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = ['', '/projects', '/certificates', '/skills', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
    })
  );

  // Derived from portfolio.json so new projects are always listed with their canonical URL.
  const projectRoutes: MetadataRoute.Sitemap = (portfolioData.projects || []).map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
