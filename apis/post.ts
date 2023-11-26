import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

interface CreatePostProps {
  userId: string | undefined
  username: string | undefined | null
  userImg: string | undefined | null
  tag: string | undefined
  text: string
}

export async function createPost(props: CreatePostProps) {
  return await addDoc(collection(db, 'posts'), {
    ...props,
    timestamp: serverTimestamp(),
  })
}

export function getPostsQuery() {
  return query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
}

export function getPostRef(postId: string) {
  return doc(db, 'posts', postId)
}

export async function getPost(postId: string) {
  return await getDoc(getPostRef(postId))
}

export async function deletePost(postId: string) {
  return await deleteDoc(doc(db, 'posts', postId))
}
