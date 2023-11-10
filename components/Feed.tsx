'use client'

import { Box, Flex, Heading, Icon } from '@chakra-ui/react'
import { PiShootingStarDuotone } from 'react-icons/pi'
import Input from './Input'

function Feed() {
  return (
    <Box flexGrow={1} ml={{ sm: '80px', lg: '260px' }} h={'full'}>
      <Flex
        justifyContent='space-between'
        px={{ sm: '4px' }}
        py={4}
        position='sticky'
        top={0}
        zIndex={9}
      >
        <Heading as='h2' size={{ sm: 'sm', lg: 'md' }}>
          Home
        </Heading>
        <Flex>
          <Icon w={6} h={6} as={PiShootingStarDuotone} />
        </Flex>
      </Flex>
      <Input />
    </Box>
  )
}

export default Feed
