import { getPostRef } from '@/apis/post'
import { PostType } from '@/types/type'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

function usePost(postId: string) {
  const [post, setPost] = useState<PostType>()

  useEffect(() => {
    if (!postId) return
    onSnapshot(getPostRef(postId), (snapshot) => {
      setPost({
        id: snapshot.id,
        ...snapshot.data(),
      } as PostType)
    })
  }, [postId])

  return { post }
}

export default usePost
