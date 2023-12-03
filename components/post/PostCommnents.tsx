'use client'

import usePostAction from '@/hooks/usePostAction'
import { Divider, Stack } from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import Post from '../common/post/Post'

function PostComments() {
  const { postId } = useParams<{ postId: string }>()
  const { comments } = usePostAction(postId)

  return (
    <Stack divider={<Divider />} my={4}>
      {comments.map((commnet) => (
        <Post key={commnet.id} post={commnet} />
      ))}
    </Stack>
  )
}

export default PostComments
