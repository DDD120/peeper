import { getPost } from '@/apis/post'
import { PostType } from '@/types/type'
import { useCallback, useEffect, useState } from 'react'

function useUpperPost(postId: string | null | undefined) {
  const [upperPost, setUpperPost] = useState<PostType>()
  const [target, setTarget] = useState<HTMLDivElement | null>(null)

  const onIntersect: IntersectionObserverCallback = useCallback(
    async ([entrie], observer) => {
      if (entrie.isIntersecting) {
        observer.unobserve(target!)
        const snapshot = await getPost(postId!)
        setUpperPost({
          id: snapshot.id,
          ...snapshot.data(),
        } as PostType)
        observer.observe(target!)
      }
    },
    [postId, target]
  )

  useEffect(() => {
    if (!postId) return
    if (!target) return
    const io = new IntersectionObserver(onIntersect, {})
    io.observe(target)

    return () => io.disconnect()
  }, [postId, target, onIntersect])

  return { upperPost, setTarget }
}

export default useUpperPost
