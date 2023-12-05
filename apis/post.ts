import {
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'

interface CreatePostProps {
  upperPostId: string | null
  userId: string | undefined
  username: string | undefined | null
  userImg: string | undefined | null
  tag: string | undefined
  text: string
}

export async function createPost(props: CreatePostProps) {
  return await addDoc(collection(db, 'posts'), {
    ...props,
    createAt: serverTimestamp(),
    deleteAt: null,
  })
}

export function getPostsQuery() {
  return query(
    collection(db, 'posts'),
    where('upperPostId', '==', null),
    where('deleteAt', '==', null),
    orderBy('createAt', 'desc')
  )
}

export function getPostRef(postId: string) {
  return doc(db, 'posts', postId)
}

export async function getPost(postId: string) {
  return await getDoc(getPostRef(postId))
}

export async function deletePost(postId: string) {
  return await updateDoc(doc(db, 'posts', postId), {
    deleteAt: serverTimestamp(),
  })
}
