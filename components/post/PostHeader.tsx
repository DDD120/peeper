'use client'

import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { PiArrowLeftDuotone as ArrowLeftIcon } from 'react-icons/pi'

function PostHeader() {
  const router = useRouter()

  return (
    <Flex
      alignItems='center'
      gap={2}
      py={4}
      position='sticky'
      top={0}
      zIndex={9}
      backgroundColor='#fff'
    >
      <IconButton
        aria-label='back button'
        variant='ghost'
        w={6}
        h={6}
        rounded='full'
        onClick={() => router.push('/')}
      >
        <ArrowLeftIcon />
      </IconButton>
      <Heading as='h2' size={{ sm: 'sm', lg: 'md' }}>
        Peep
      </Heading>
    </Flex>
  )
}

export default PostHeader
