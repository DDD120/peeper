'use client'

import usePost from '@/hooks/usePost'
import UpperPost from './UpperPost'
import { useParams } from 'next/navigation'
import Post from './Post'
import { useEffect, useRef } from 'react'

function PostMain() {
  const { postId } = useParams<{ postId: string }>()
  const { post, upperPost } = usePost(postId)

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [scrollRef])

  return (
    <>
      {upperPost && <UpperPost post={upperPost} />}
      {post && <Post post={post} postId={postId} ref={scrollRef} />}
    </>
  )
}

export default PostMain
