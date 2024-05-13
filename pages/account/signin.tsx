import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useMergeCustomerCart } from '@graphcommerce/magento-cart'
import { AccountSignInUpForm } from '../../components/AccountSignInUpForm/AccountSignInUpForm'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { useMergeGuestWishlistWithCustomer } from '@graphcommerce/magento-wishlist'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, Box } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'
import { convertLength } from '@mui/material/styles/cssUtils'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountSignInPage() {
  useMergeCustomerCart()
  useMergeGuestWishlistWithCustomer()

  return (
    <Box
      className='cst_login_signup_bg'
      sx={{
        backgroundImage: 'url("/images/bg-login-signup.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionX: 'right',
        height: '100vh',
        paddingBottom: '50px',
      }}
    >
      <PageMeta title={i18n._(/* i18n */ 'Sign in')} metaRobots={['noindex']} />
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          <Trans id='Login' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <AccountSignInUpForm />
      <Container maxWidth='sm'></Container>
    </Box>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  sharedKey: () => 'account-public',
  Layout: LayoutOverlay,
}
AccountSignInPage.pageOptions = pageOptions

export default AccountSignInPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
    },
  }
}
