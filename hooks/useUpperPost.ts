import { getPostRef } from '@/apis/post'
import { PostType } from '@/types/type'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

function useUpperPost(postId: string | null | undefined) {
  const [upperPost, setUpperPost] = useState<PostType>()

  useEffect(() => {
    if (!postId) return
    onSnapshot(getPostRef(postId), (snapshot) => {
      setUpperPost({
        id: snapshot.id,
        ...snapshot.data(),
      } as PostType)
    })
  }, [postId])

  return { upperPost }
}

export default useUpperPost
