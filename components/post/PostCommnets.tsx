'use client'

import usePostAction from '@/hooks/usePostAction'
import { Divider, Stack } from '@chakra-ui/react'
import Post from '../home/Post'
import { useParams } from 'next/navigation'

function PostCommnets() {
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

export default PostCommnets
