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

export interface Likes {
  id: string
  userId: string
}
