import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'

interface RegisterProps {
  userId: string
  username: string
  userImg: string | null | undefined
  tag: string
  provider: string | undefined
  email: string | null | undefined
}

export async function register({ userId, ...rest }: RegisterProps) {
  return await setDoc(doc(db, 'users', userId), {
    userId,
    ...rest,
    timestamp: serverTimestamp(),
  })
}

export async function getUser(userId: string) {
  return await getDoc(doc(db, 'users', userId))
}
