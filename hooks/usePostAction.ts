import { getCommentsQuery } from '@/apis/comment'
import { getLikesByPostQuery, likePost, unlikePost } from '@/apis/like'
import { deletePost } from '@/apis/post'
import { useSetModalState, useSetPostIdState } from '@/atoms/modalAtom'
import { CommentType, LikeType } from '@/types/type'
import { onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function usePostAction(postId: string) {
  const [comments, setComments] = useState<CommentType[]>([])
  const [likes, setLikes] = useState<LikeType[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [hasMyComment, setHasMyComment] = useState(false)
  const setIsOpen = useSetModalState()
  const setPostId = useSetPostIdState()
  const router = useRouter()
  const { data: session } = useSession()

  const handleChatClick = () => {
    setIsOpen(true)
    setPostId(postId)
  }

  const handleHeartClick = async () => {
    if (!session || !session.user.uid) return
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

  const handleTrashClick = () => {
    deletePost(postId)
    router.replace('/')
  }

  useEffect(() => {
    onSnapshot(getCommentsQuery(postId), (snapshot) => {
      const comments = snapshot.docs.map((doc) => {
        const data = doc.data()
        if (data.userId === session?.user.uid) setHasMyComment(true)

        return {
          id: doc.id,
          ...data,
        } as CommentType
      })
      setComments(comments)
    })
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
  }, [postId, session])

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