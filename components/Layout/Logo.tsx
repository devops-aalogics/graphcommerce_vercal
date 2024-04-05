import { Logo as LogoBase } from '@graphcommerce/next-ui'
// import svgLogo from './graphcommerce.svg'
import richy from './richylogo.png'

export function Logo() {
  return (  
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          width: { xs: '100px', md: '170px' },
          height: { xs: '36px', md: '70px' },
          paddingLeft: { xs: '10px', md: 0 },
          marginTop: { xs: 0, md: '-5px' },
          // filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
        },
      }}
      image={{ alt: 'GraphCommerce Logo', src: richy, unoptimized: true }}
    />
  )
}
