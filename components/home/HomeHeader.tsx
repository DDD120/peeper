import { Flex, Heading, Icon } from '@chakra-ui/react'
import React from 'react'
import { PiShootingStarDuotone as StarIcon } from 'react-icons/pi'

function HomeHeader() {
  return (
    <Flex
      justifyContent='space-between'
      py={4}
      position='sticky'
      top={0}
      zIndex={9}
      backgroundColor='#fff'
    >
      <Heading as='h2' size={{ sm: 'sm', lg: 'md' }}>
        홈
      </Heading>
      <Flex>
        <Icon w={6} h={6}>
          <StarIcon width='100%' />
        </Icon>
      </Flex>
    </Flex>
  )
}

export default HomeHeader
