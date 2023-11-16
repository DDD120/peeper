import { FieldValue } from 'firebase/firestore'

export interface PostType {
  id: string
  userId: string
  username: string
  userImg: string
  tag: string
  text: string
  timestemp: FieldValue
}

export interface LikeType {
  id: string
  userId: string
}

export interface CommentType {
  id: string
  comment: string
  userId: string
  username: string
  userImg: string
  tag: string
}
