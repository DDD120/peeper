"use client"

import { Box, Button, Flex, List, Show, theme } from "@chakra-ui/react"
import SidebarLink from "./SidebarLink"
import {
  PiHouseDuotone,
  PiHashDuotone,
  PiBellDuotone,
  PiEnvelopeSimpleDuotone,
  PiBookmarkSimpleDuotone,
  PiClipboardDuotone,
  PiUserDuotone,
  PiDotsThreeOutlineDuotone,
  PiBirdDuotone,
} from "react-icons/pi"

function Sidebar() {
  return (
    <Show above="sm">
      <Flex
        flexDir="column"
        alignItems={{ md: "cneter", lg: "flex-start" }}
        h="full"
        position="fixed"
        padding={4}
      >
        <Box
          w="32px"
          h="32px"
          p={4}
          ml={{ lg: "24px" }}
          borderRadius="full"
          _hover={{
            cursor: "pointer",
          }}
        >
          <PiBirdDuotone size={32} />
        </Box>
        <List spacing={2} mt={8} mb={4} ml={{ lg: "24px" }}>
          <SidebarLink text="Home" Icon={PiHouseDuotone} active />
          <SidebarLink text="Explore" Icon={PiHashDuotone} />
          <SidebarLink text="Notifications" Icon={PiBellDuotone} />
          <SidebarLink text="Messages" Icon={PiEnvelopeSimpleDuotone} />
          <SidebarLink text="Bookmarks" Icon={PiBookmarkSimpleDuotone} />
          <SidebarLink text="Lists" Icon={PiClipboardDuotone} />
          <SidebarLink text="Profile" Icon={PiUserDuotone} />
          <SidebarLink text="More" Icon={PiDotsThreeOutlineDuotone} />
        </List>
        <Show above="lg">
          <Button
            w="224px"
            h="52px"
            flexShrink={0}
            rounded="full"
            backgroundColor={theme.colors.blackAlpha[200]}
            fontSize="lg"
          >
            Peep
          </Button>
        </Show>
      </Flex>
    </Show>
  )
}

export default Sidebar
