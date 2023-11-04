import type { Metadata } from "next"
import "./globals.css"
import Providers from "@/provider/provider"
import { Container } from "@chakra-ui/react"

export const metadata: Metadata = {
  title: "Peeper",
  description: "SNS",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Container as="main" h="full" maxW={"1500px"} fontFamily="nanum">
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}
