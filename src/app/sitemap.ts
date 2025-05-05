import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://evmutils.com';

  const paths = [
    '',
    '/unit-converter',
    '/pk-generator',
    '/tx-decoder',
    '/nft',
    '/ens',
    '/compute-address',
    '/data-decoder',
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
