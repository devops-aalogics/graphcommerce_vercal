// @ts-check

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  hygraphEndpoint: 'https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master',
  magentoEndpoint: 'https://staging.richy.sa/graphql',
  canonicalBaseUrl: 'https://headless.richy.sa',
  storefront: [
    { locale: 'en', magentoStoreCode: 'en' },
    { locale: 'ar', magentoStoreCode: 'ar', defaultLocale: true },
  ],
  recentlyViewedProducts: {
    enabled: true,
  },
}

module.exports = config
