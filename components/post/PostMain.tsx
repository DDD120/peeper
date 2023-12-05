'use client'

import usePost from '@/hooks/usePost'
import UpperPost from './UpperPost'
import { useParams } from 'next/navigation'
import Post from './Post'
import { useEffect, useRef } from 'react'
import DeletePost from './DeletePost'
import { Divider, Stack } from '@chakra-ui/react'

function PostMain() {
  const { postId } = useParams<{ postId: string }>()
  const { post, upperPost } = usePost(postId)

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: 'start' })
    scrollBy(0, -46)
  }, [scrollRef, upperPost])

  return (
    <>
      <Stack divider={<Divider />} my={4}>
        {upperPost && <UpperPost post={upperPost} />}
      </Stack>
      <div ref={scrollRef}></div>
      {post?.deleteAt ? <DeletePost /> : <Post post={post} postId={postId} />}
    </>
  )
}

export default PostMain
