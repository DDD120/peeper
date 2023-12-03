'use client'

import { PostType } from '@/types/type'
import Post from '../common/post/Post'
import useUpperPost from '@/hooks/useUpperPost'

interface Props {
  post: PostType
}

function UpperPost({ post }: Props) {
  const { upperPost } = useUpperPost(post.upperPostId)

  return (
    <>
      {upperPost && <UpperPost post={upperPost} />}
      <Post post={post} />
    </>
  )
}

export default UpperPost
