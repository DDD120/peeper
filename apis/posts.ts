import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import { PostType } from '@/types/posts'

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
