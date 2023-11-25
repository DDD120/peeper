'use client'

import { Button, Flex, Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

function WithGoogle() {
  return (
    <Button
      variant='unstyled'
      onClick={() => signIn('google', { callbackUrl: '/' })}
    >
      <Flex
        gap={6}
        p={2}
        border='1px'
        borderColor='blackAlpha.200'
        borderRadius={4}
        cursor='pointer'
      >
        <Image src='/g-logo.png' alt='google login' width={24} height={24} />
        <Text fontFamily='roboto'>Sign in with Google</Text>
      </Flex>
    </Button>
  )
}

export default WithGoogle
