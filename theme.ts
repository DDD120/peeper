import { extendTheme } from "@chakra-ui/react"
import { Nanum_Gothic, Roboto } from "next/font/google"

const nanum = Nanum_Gothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

const roboto = Roboto({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
})

const theme = extendTheme({
  fonts: {
    nanum: nanum.style.fontFamily,
    roboto: roboto.style.fontFamily,
  },
})

export default theme
