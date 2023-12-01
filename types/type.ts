import { Timestamp } from 'firebase/firestore'

export interface PostType {
  id: string
  upperPostId: string | null
  userId: string
  username: string
  userImg: string
  tag: string
  text: string
  timestamp: Timestamp
}

export interface LikeType {
  id: string
  userId: string
}

export interface CommentType {
  upperPostId: string
  id: string
  text: string
  userId: string
  username: string
  userImg: string
  tag: string
  timestamp: Timestamp
}

export interface UserType {
  userId: string
  username: string
  userImg: string | null | undefined
  tag: string
  provider: string | undefined
  email: string | null | undefined
}
