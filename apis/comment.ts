import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

interface CreateCommentProps {
  postId: string
  comment: string
  userId: string | undefined
  username: string | null | undefined
  tag: string | null | undefined
  userImg: string | null | undefined
}

export async function createComment({
  postId,
  comment,
  ...userInfo
}: CreateCommentProps) {
  return await addDoc(collection(db, 'posts', postId, 'comments'), {
    comment,
    ...userInfo,
    timestamp: serverTimestamp(),
  })
}

export function getCommentsQuery(postId: string) {
  return query(
    collection(db, 'posts', postId, 'comments'),
    orderBy('timestamp', 'desc')
  )
}