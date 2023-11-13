'use client'

import { RecoilRoot } from 'recoil'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import theme from '@/theme'

interface Props {
  session: Session | null
  children: React.ReactNode
}

function Providers({ session, children }: Props) {
  return (
    <SessionProvider session={session}>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <RecoilRoot>{children}</RecoilRoot>
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  )
}

export default Providers
