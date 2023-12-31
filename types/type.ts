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

export interface CreatePostPropsType {
  upperPostId: string | null
  userId: string | undefined
  username: string | undefined | null
  userImg: string | undefined | null
  tag: string | undefined
  text: string
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

export interface RegisterPropsType {
  userId: string
  username: string
  userImg: string | null | undefined
  tag: string
  provider: string | undefined
  email: string | null | undefined
}

export interface ProfileType {
  userId: string
  backgroundImage: string
  createAt: Timestamp
  deleteAt: Timestamp | null
  email: string
  followerCount: number
  followingCount: number
  introduction: string
  provider: string
  tag: string
  userImg: string
  username: string
}
