'use client'

import usePost from '@/hooks/usePost'
import UpperPost from './UpperPost'
import { useParams } from 'next/navigation'
import Post from './Post'
import useUpperPost from '@/hooks/useUpperPost'
import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

function PostMain() {
  const { postId } = useParams<{ postId: string }>()
  const { post } = usePost(postId)
  const { upperPost } = useUpperPost(post?.upperPostId)

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [scrollRef])
  console.log(scrollRef)

  return (
    <>
      {upperPost && <UpperPost post={upperPost} />}
      {post && <Post post={post} postId={postId} ref={scrollRef} />}
    </>
  )
}

export default PostMain
