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
    scrollRef.current?.scrollIntoView({ block: 'start' })
    scrollBy(0, -46)
  }, [scrollRef, upperPost])

  return (
    <>
      {upperPost && <UpperPost post={upperPost} />}
      <div ref={scrollRef}></div>
      {post && <Post post={post} postId={postId} />}
    </>
  )
}

export default PostMain
