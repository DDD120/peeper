import { getCommentsQuery } from '@/apis/comment'
import { getLikesByPostQuery, likePost, unlikePost } from '@/apis/like'
import { deletePost } from '@/apis/post'
import { useSetCommentModalState, useSetPostIdState } from '@/atoms/modalAtom'
import { LikeType, PostType } from '@/types/type'
import { onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MouseEvent, useCallback, useEffect, useState } from 'react'

function usePostAction(postId: string | undefined) {
  const [comments, setComments] = useState<PostType[]>([])
  const [likes, setLikes] = useState<LikeType[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [hasMyComment, setHasMyComment] = useState(false)
  const setIsOpen = useSetCommentModalState()
  const setPostId = useSetPostIdState()
  const router = useRouter()
  const { data: session } = useSession()

  const handleChatClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!postId) return
    setIsOpen(true)
    setPostId(postId)
  }

  const handleHeartClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!session || !session.user.uid || !postId) return
    setIsLiked(!isLiked)
    if (isLiked) {
      await unlikePost({
        postId,
        userId: session.user.uid,
      })
    } else {
      await likePost({
        postId,
        userId: session.user.uid,
      })
    }
  }

  const handleTrashClick = (e: MouseEvent) => {
    e.stopPropagation()
    if (!postId) return
    deletePost(postId)
    router.replace('/')
  }

  const getComments = useCallback(async () => {
    if (!postId) return
    onSnapshot(await getCommentsQuery(postId), (snapshot) => {
      const comments = snapshot.docs.map((doc) => {
        const data = doc.data()
        if (data.userId === session?.user.uid) setHasMyComment(true)

        return {
          id: doc.id,
          ...data,
        } as PostType
      })
      setComments(comments)
    })
  }, [postId, session])

  useEffect(() => {
    if (!postId) return
    getComments()
    onSnapshot(getLikesByPostQuery(postId), (snapshot) => {
      const likes = snapshot.docs.map((doc) => {
        const data = doc.data()
        if (data.userId === session?.user.uid) setIsLiked(true)

        return {
          id: doc.id,
          ...data,
        } as LikeType
      })
      setLikes(likes)
    })
  }, [postId, session, getComments])

  return {
    comments,
    likes,
    isLiked,
    hasMyComment,
    handleChatClick,
    handleHeartClick,
    handleTrashClick,
  }
}

export default usePostAction
