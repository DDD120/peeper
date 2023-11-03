import type { Metadata } from "next"
import "./globals.css"
import Providers from "@/provider/provider"
import { Box } from "@chakra-ui/react"

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
          <Box h="full" fontFamily="nanum">
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  )
}
