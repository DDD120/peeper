import { extendTheme } from "@chakra-ui/react"
import { Nanum_Gothic } from "next/font/google"

const nanum = Nanum_Gothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

const theme = extendTheme({
  fonts: {
    nanum: nanum.style.fontFamily,
  },
})

export default theme
