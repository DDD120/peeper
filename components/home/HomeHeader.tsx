import { Flex, Heading, Icon } from '@chakra-ui/react'
import React from 'react'
import { PiShootingStarDuotone as StarIcon } from 'react-icons/pi'
import Header from '../common/Header'

function HomeHeader() {
  return (
    <Header heading='홈'>
      <Flex>
        <Icon w={6} h={6}>
          <StarIcon width='100%' />
        </Icon>
      </Flex>
    </Header>
  )

  // return (
  //   <Flex
  //     justifyContent='space-between'
  //     py={4}
  //     position='sticky'
  //     top={0}
  //     zIndex={9}
  //     backgroundColor='#fff'
  //   >
  //     <Heading as='h2' size={{ sm: 'sm', lg: 'md' }}>
  //       홈
  //     </Heading>

  //   </Flex>
  // )
}

export default HomeHeader
