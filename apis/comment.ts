import {
  FieldPath,
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'
import { createPost } from './post'

interface CreateCommentProps {
  upperPostId: string
  text: string
  userId: string | undefined
  username: string | undefined | null
  userImg: string | undefined | null
  tag: string | undefined
}

export async function createComment({
  upperPostId,
  ...rest
}: CreateCommentProps) {
  const comment = await createPost({
    upperPostId,
    ...rest,
  })

  return await setDoc(doc(db, 'posts', upperPostId, 'comments', comment.id), {})
}

export async function getCommentsQuery(postId: string) {
  const comments = await getDocs(collection(db, 'posts', postId, 'comments'))
  const ids: string[] = []
  comments.forEach((c) => ids.push(c.id))
  if (!ids.length) return query(collection(db, 'invalid'))

  return query(collection(db, 'posts'), where(documentId(), 'in', ids))
}
