import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { RegisterProps } from '@/types/type'

export async function register({ userId, ...rest }: RegisterProps) {
  return await setDoc(doc(db, 'users', userId), {
    userId,
    ...rest,
    backgroundImage: '',
    introduction: '',
    followingCount: 0,
    followerCount: 0,
    createAt: serverTimestamp(),
    deleteAt: null,
  })
}

export async function getUser(userId: string) {
  return await getDoc(doc(db, 'users', userId))
}
