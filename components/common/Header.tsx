'use client'

import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { PiArrowLeftDuotone as BackIcon } from 'react-icons/pi'
import Tooltip from './Tooltip'

interface Props {
  isBackButton?: boolean
  heading: string
  children?: React.ReactNode
}

function Header({ heading, isBackButton = false, children }: Props) {
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
      justifyContent='space-between'
      alignItems='center'
      position='sticky'
      py={4}
      top={0}
      zIndex={9}
      backgroundColor='#fff'
    >
      <Flex gap={4}>
        {isBackButton && (
          <Tooltip label='돌아가기'>
            <IconButton
              aria-label='back button'
              variant='ghost'
              w={6}
              h={6}
              rounded='full'
              onClick={handleBackClick}
            >
              <BackIcon />
            </IconButton>
          </Tooltip>
        )}
        <Heading as='h2' size={{ sm: 'sm', lg: 'md' }}>
          {heading}
        </Heading>
      </Flex>
      {children}
    </Flex>
  )
}

export default Header
