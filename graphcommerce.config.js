// @ts-check

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  hygraphEndpoint: 'https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master',
  magentoEndpoint: 'https://staging.richy.sa/graphql',
  canonicalBaseUrl: 'https://graphcommerce.vercel.app',
  storefront: [
    { locale: 'en', magentoStoreCode: 'en', defaultLocale: true },
    { locale: 'ar', magentoStoreCode: 'ar' },
  ],
  recentlyViewedProducts: {
    enabled: true,
  },
}

module.exports = config
