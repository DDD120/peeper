import { Timestamp } from 'firebase/firestore'

export interface PostType {
  id: string
  upperPostId: string | null
  userId: string
  username: string
  userImg: string
  tag: string
  text: string
  createAt: Timestamp
  deleteAt: Timestamp | null
}

export interface LikeType {
  id: string
  userId: string
}

export interface UserType {
  userId: string
  username: string
  userImg: string | null | undefined
  tag: string
  provider: string | undefined
  email: string | null | undefined
}
