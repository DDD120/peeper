'use client'

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Show,
  Text,
  theme,
} from '@chakra-ui/react'
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
  PiDotsThreeOutlineVerticalDuotone as DotsIcon,
} from 'react-icons/pi'
import { signOut, useSession } from 'next-auth/react'

function Sidebar() {
  const { data: session } = useSession()
  return (
    <Show above='sm'>
      <Flex
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
              backgroundColor={theme.colors.blackAlpha[200]}
              fontSize='lg'
            >
              Peep
            </Button>
          </Show>
        </Box>
        <Box flexShrink={0}>
          <Menu>
            <MenuButton h={16} rounded='full' variant='ghost' as={Button}>
              <Flex gap={{ md: 2 }} alignItems='center'>
                <Avatar
                  size='sm'
                  name={session?.user.name!}
                  src={session?.user.image!}
                />
                <Show above='lg'>
                  <Box textAlign='left'>
                    <Heading as='h3' size='sm'>
                      {session?.user.name}
                    </Heading>
                    <Text fontSize='xs'>@{session?.user.tag}</Text>
                  </Box>
                  <DotsIcon />
                </Show>
              </Flex>
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem onClick={() => signOut()}>로그아웃</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Box>
      </Flex>
    </Show>
  )
}

export default Sidebar
