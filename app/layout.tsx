import type { Metadata } from "next"
import "./globals.css"
import Providers from "@/provider/provider"
import { Container } from "@chakra-ui/react"
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import { authOptions } from "./api/auth/[...nextauth]/route"

export const metadata: Metadata = {
  title: "Peeper",
  description: "SNS",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="ko">
      <body>
        <Providers session={session}>
          <Container as="main" h="full" maxW={"1500px"} fontFamily="nanum">
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}
