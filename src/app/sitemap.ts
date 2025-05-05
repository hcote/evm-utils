import { type MetadataRoute } from 'next';

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

const sitemap: MetadataRoute.Sitemap = paths.map((path) => ({
  url: `${baseUrl}${path}`,
  lastModified: new Date().toISOString(),
}));

export default sitemap;
