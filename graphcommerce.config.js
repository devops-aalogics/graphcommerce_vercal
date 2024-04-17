// @ts-check

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  hygraphEndpoint: 'https://eu-west-2.cdn.hygraph.com/content/clv1yiz1z000008l8hsh91l2j/master',
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
