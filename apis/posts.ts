import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

interface CreatePostProps {
  text: string
}

export async function createPost({ text }: CreatePostProps) {
  return await addDoc(collection(db, 'posts'), {
    text,
    timestemp: serverTimestamp(),
  })
}
