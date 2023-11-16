import { collection, deleteDoc, doc, query, setDoc } from 'firebase/firestore'
import { db } from './firebase'

interface likePostProps {
  postId: string
  userId: string
}

export async function unlikePost({ postId, userId }: likePostProps) {
  return await deleteDoc(doc(db, 'posts', postId, 'likes', userId))
}

export async function likePost({ postId, userId }: likePostProps) {
  return await setDoc(doc(db, 'posts', postId, 'likes', userId), {
    userId,
  })
}

export function getLikesByPostQuery(postId: string) {
  return query(collection(db, 'posts', postId, 'likes'))
}
