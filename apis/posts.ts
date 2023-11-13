import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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
    timestemp: serverTimestamp(),
  })
}

export function getPosts() {
  return query(collection(db, 'posts'), orderBy('timestemp', 'desc'))
}

export async function deletePost(id: string) {
  await deleteDoc(doc(db, 'posts', id))
}
