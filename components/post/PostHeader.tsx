'use client'

import { Flex, Heading, IconButton, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { PiArrowLeftDuotone as ArrowLeftIcon } from 'react-icons/pi'
import CustomTooltip from '../common/CustomTooltip'

function PostHeader() {
  const router = useRouter()

  const handleBackClick = () => {
    if (document.referrer.startsWith(process.env.NEXT_PUBLIC_HOST)) {
      router.back()
    } else {
      router.push('/', { scroll: false })
    }
  }

  return (
    <Flex
      as='header'
      alignItems='center'
      gap={2}
      py={4}
      position='sticky'
      top={0}
      zIndex={9}
      backgroundColor='#fff'
    >
      <CustomTooltip label='돌아가기'>
        <IconButton
          aria-label='back button'
          variant='ghost'
          w={6}
          h={6}
          rounded='full'
          onClick={handleBackClick}
        >
          <ArrowLeftIcon />
        </IconButton>
      </CustomTooltip>
      <Heading as='h2' size={{ sm: 'sm', lg: 'md' }}>
        Peep
      </Heading>
    </Flex>
  )
}

export default PostHeader
