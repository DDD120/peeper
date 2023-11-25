import { Box, Button, Flex, List, Show } from '@chakra-ui/react'
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
} from 'react-icons/pi'
import Profile from './Profile'
import HomeLogo from './HomeLogo'

function Sidebar() {
  return (
    <Show above='sm'>
      <Flex
        as='nav'
        flexDir='column'
        alignItems={{ sm: 'cneter', lg: 'flex-start' }}
        justifyContent='space-between'
        gap={4}
        h='full'
        position='fixed'
        py={4}
        pr={4}
      >
        <Box w='full'>
          <HomeLogo />
          <List spacing={2} my={4}>
            <SidebarLink text='홈' Icon={HomeIcon} active />
            <SidebarLink text='탐색하기' Icon={ExploreIcon} />
            <SidebarLink text='알림' Icon={NotificationsIcon} />
            <SidebarLink text='메시지' Icon={MessagesIcon} />
            <SidebarLink text='북마크' Icon={BookmarksIcon} />
            <SidebarLink text='리스트' Icon={ListsIcon} />
            <SidebarLink text='프로필' Icon={ProfileIcon} />
            <SidebarLink text='더보기' Icon={MoreIcon} />
          </List>
          <Show above='lg'>
            <Button
              w='full'
              h='52px'
              flexShrink={0}
              rounded='full'
              backgroundColor='blackAlpha.200'
              fontSize='lg'
            >
              Peep
            </Button>
          </Show>
        </Box>
        <Profile />
      </Flex>
    </Show>
  )
}

export default Sidebar
