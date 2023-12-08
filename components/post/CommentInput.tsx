'use client'

import { Box, Input } from '@chakra-ui/react'
import { useState } from 'react'
import PostInput from '../common/post/PostInput'
import { useParams } from 'next/navigation'

function CommentInput() {
  const { postId } = useParams<{ postId: string }>()
  const [isClick, setIsClick] = useState(false)

  if (isClick) {
    return (
      <Box
        borderColor='gray.200'
        borderWidth='1px'
        borderBottomRadius={4}
        p={2}
      >
        <PostInput upperPostId={postId} />
      </Box>
    )
  }

  return (
    <Input
      size='lg'
      placeholder='답글 달기'
      borderTopRadius={0}
      focusBorderColor='gray.200'
      _hover={{
        borderColor: 'gray.200',
        borderWidth: 1,
      }}
      _focusVisible={{
        borderWidth: 1,
      }}
      onClick={() => setIsClick(!isClick)}
    />
  )
}

export default CommentInput
