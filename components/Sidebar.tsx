'use client'

import { Box, Button, Flex, List, Show, theme } from '@chakra-ui/react'
import SidebarLink from './SidebarLink'
import {
  PiHouseDuotone as HomeIcon,
  PiHashDuotone as ExploreIcon,
  PiBellDuotone as NotificationsIcon,
  PiEnvelopeSimpleDuotone as MessagesIcon,
  PiBookmarkSimpleDuotone as BookmarksIcon,
  PiClipboardDuotone as ListsIcon,
  PiUserDuotone as ProfileIcon,
  PiDotsThreeOutlineDuotone as MoreIcon,
  PiBirdDuotone as BirdIcon,
} from 'react-icons/pi'

function Sidebar() {
  return (
    <Show above='sm'>
      <Flex
        flexDir='column'
        alignItems={{ md: 'cneter', lg: 'flex-start' }}
        h='full'
        position='fixed'
        py={4}
        pr={4}
      >
        <Box
          w='32px'
          h='32px'
          p={4}
          borderRadius='full'
          _hover={{
            cursor: 'pointer',
          }}
        >
          <BirdIcon size={32} />
        </Box>
        <List spacing={2} mt={8} mb={4}>
          <SidebarLink text='Home' Icon={HomeIcon} active />
          <SidebarLink text='Explore' Icon={ExploreIcon} />
          <SidebarLink text='Notifications' Icon={NotificationsIcon} />
          <SidebarLink text='Messages' Icon={MessagesIcon} />
          <SidebarLink text='Bookmarks' Icon={BookmarksIcon} />
          <SidebarLink text='Lists' Icon={ListsIcon} />
          <SidebarLink text='Profile' Icon={ProfileIcon} />
          <SidebarLink text='More' Icon={MoreIcon} />
        </List>
        <Show above='lg'>
          <Button
            w='224px'
            h='52px'
            flexShrink={0}
            rounded='full'
            backgroundColor={theme.colors.blackAlpha[200]}
            fontSize='lg'
          >
            Peep
          </Button>
        </Show>
      </Flex>
    </Show>
  )
}

export default Sidebar
