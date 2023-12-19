import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'
import { RegisterPropsType } from '@/types/type'

export async function register({ userId, tag, ...rest }: RegisterPropsType) {
  setDoc(doc(db, 'user-tag', tag), {
    userId,
  })
  return await setDoc(doc(db, 'users', userId), {
    userId,
    tag,
    ...rest,
    backgroundImage: '',
    introduction: '',
    followingCount: 0,
    followerCount: 0,
    createAt: serverTimestamp(),
    deleteAt: null,
  })
}

export async function getUserId(userTag: string) {
  return await getDoc(doc(db, 'user-tag', userTag))
}

export async function getUser(userId: string) {
  return await getDoc(doc(db, 'users', userId))
}
