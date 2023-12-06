'use client'

import usePostAction from '@/hooks/usePostAction'
import { Divider, Stack } from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import Post from '../common/post/Post'
import DeletePost from './DeletePost'

function PostComments() {
  const { postId } = useParams<{ postId: string }>()
  const { comments } = usePostAction(postId)

  return (
    <Stack divider={<Divider />} my={4}>
      {comments.map((comment) =>
        comment.deleteAt ? (
          <DeletePost key={comment.id} postId={comment.id} />
        ) : (
          <Post key={comment.id} post={comment} />
        )
      )}
    </Stack>
  )
}

export default PostComments
