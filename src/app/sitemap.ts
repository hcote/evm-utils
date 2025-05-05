import { type MetadataRoute } from 'next';

export async function GET(): Promise<MetadataRoute.Sitemap> {
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

  const pages = paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));

  return pages;
}
