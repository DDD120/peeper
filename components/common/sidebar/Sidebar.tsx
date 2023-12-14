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
import WritePost from './WritePost'

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
            <SidebarLink to='/' text='홈' Icon={HomeIcon} active />
            <SidebarLink to='/' text='탐색하기' Icon={ExploreIcon} />
            <SidebarLink to='/' text='알림' Icon={NotificationsIcon} />
            <SidebarLink to='/' text='메시지' Icon={MessagesIcon} />
            <SidebarLink to='/' text='북마크' Icon={BookmarksIcon} />
            <SidebarLink to='/' text='리스트' Icon={ListsIcon} />
            <SidebarLink to='/' text='프로필' Icon={ProfileIcon} />
            <SidebarLink to='/' text='더보기' Icon={MoreIcon} />
          </List>
          <WritePost />
        </Box>
        <Profile />
      </Flex>
    </Show>
  )
}

export default Sidebar
