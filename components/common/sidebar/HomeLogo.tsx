'use client'

import { IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { PiBirdDuotone as BirdIcon } from 'react-icons/pi'

function HomeLogo() {
  const router = useRouter()

  return (
    <IconButton
      ml={2}
      size='lg'
      aria-label='logo button'
      borderRadius='full'
      variant='ghost'
      fontSize='32px'
      onClick={() => router.push('/')}
      icon={<BirdIcon />}
    />
  )
}

export default HomeLogo
