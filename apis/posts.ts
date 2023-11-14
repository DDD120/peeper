import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from './firebase'

interface CreatePostProps {
  userId: string | undefined
  username: string | undefined | null
  userImg: string | undefined | null
  tag: string | undefined
  text: string
}

interface UnlikePostProps {
  postId: string
  userId: string | undefined
}

export async function createPost(props: CreatePostProps) {
  return await addDoc(collection(db, 'posts'), {
    ...props,
    timestemp: serverTimestamp(),
  })
}

export function getPosts() {
  return query(collection(db, 'posts'), orderBy('timestemp', 'desc'))
}

export async function deletePost(postId: string) {
  await deleteDoc(doc(db, 'posts', postId))
}

export async function unlikePost({ postId, userId }: UnlikePostProps) {
  await deleteDoc(doc(db, 'posts', postId, 'likes', userId))
}

export async function likePost({ postId, userId }) {
  await setDoc(doc(db, 'posts', postId, 'likes', userId), {
    userId,
  })
}

export function getLikesByPost(postId: string) {
  return query(collection(db, 'posts', postId, 'likes'))
}
