'use client'

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Show,
  Text,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { PiDotsThreeOutlineVerticalDuotone as DotsIcon } from 'react-icons/pi'

function Profile() {
  const { data: session } = useSession()

  return (
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
  )
}

export default Profile
