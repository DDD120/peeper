"use client"

import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import theme from "@/theme"

interface Props {
  session: Session | null
  children: React.ReactNode
}

function Providers({ session, children }: Props) {
  if (!session) return <div>로그인</div>

  return (
    <SessionProvider session={session}>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  )
}

export default Providers
