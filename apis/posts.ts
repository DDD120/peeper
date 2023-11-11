import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

interface CreatePostProps {
  id: string | undefined
  username: string | undefined | null
  userImg: string | undefined | null
  tag: string | undefined
  text: string
}

export async function createPost({
  id,
  username,
  userImg,
  tag,
  text,
}: CreatePostProps) {
  return await addDoc(collection(db, 'posts'), {
    id,
    username,
    userImg,
    tag,
    text,
    timestemp: serverTimestamp(),
  })
}
