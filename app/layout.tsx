import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/provider/provider'
import { Container } from '@chakra-ui/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import BasicLayout from '@/components/layout/BasicLayout'

export const metadata: Metadata = {
  title: 'Peeper',
  description: 'SNS',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang='ko'>
      <body>
        <Providers session={session}>
          <Container
            h='full'
            w='100%'
            maxW='1300px'
            fontFamily='nanum'
            backgroundColor='white'
          >
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}
