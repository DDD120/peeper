'use client'

import { Box, Flex, List, Show } from '@chakra-ui/react'
import SidebarLink from './SidebarLink'
import {
  PiHouseDuotone as HomeIcon,
  PiHashDuotone as ExploreIcon,
  PiBellDuotone as NotificationsIcon,
  PiEnvelopeSimpleDuotone as MessagesIcon,
  PiBookmarkSimpleDuotone as BookmarksIcon,
  PiClipboardDuotone as ListsIcon,
  PiUserDuotone as ProfileIcon,
} from 'react-icons/pi'
import Profile from './Profile'
import HomeLogo from './HomeLogo'
import WritePost from './WritePost'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

function Sidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const links = [
    {
      to: '/',
      label: '홈',
      Icon: HomeIcon,
      active: pathname === '/',
    },
    {
      to: '/explore',
      label: '탐색하기',
      Icon: ExploreIcon,
      active: pathname === '/explore',
    },
    {
      to: '/notifications',
      label: '알림',
      Icon: NotificationsIcon,
      active: pathname === '/notifications',
    },
    {
      to: '/messages',
      label: '메시지',
      Icon: MessagesIcon,
      active: pathname === '/messages',
    },
    {
      to: '/bookmarks',
      label: '북마크',
      Icon: BookmarksIcon,
      active: pathname === '/bookmarks',
    },
    {
      to: '/lists',
      label: '리스트',
      Icon: ListsIcon,
      active: pathname === '/lists',
    },
    {
      to: `/${session?.user.tag}`,
      label: '프로필',
      Icon: ProfileIcon,
      active: pathname === `/${session?.user.tag}`,
    },
  ]

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
            {links.map(({ to, label, Icon, active }) => (
              <SidebarLink
                key={to}
                to={to}
                label={label}
                Icon={Icon}
                active={active}
              />
            ))}
          </List>
          <WritePost />
        </Box>
        <Profile />
      </Flex>
    </Show>
  )
}

export default Sidebar
