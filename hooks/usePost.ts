import { getPost } from '@/apis/post'
import { PostType } from '@/types/type'
import { useEffect, useState } from 'react'

function usePost(postId: string) {
  const [post, setPost] = useState<PostType>()
  const [upperPost, setUpperPost] = useState<PostType>()

  useEffect(() => {
    if (!postId) return
    const get = async () => {
      const snapshot = await getPost(postId)
      setPost({
        id: snapshot.id,
        ...snapshot.data(),
      } as PostType)
    }
    get()
  }, [postId])

  useEffect(() => {
    if (!post) return
    if (!post.upperPostId) return
    const get = async () => {
      const snapshot = await getPost(post.upperPostId!)
      setUpperPost({
        id: snapshot.id,
        ...snapshot.data(),
      } as PostType)
    }
    get()
  }, [post, post?.upperPostId])

  return { post, upperPost }
}

export default usePost
