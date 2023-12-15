import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

export const commentModalState = atom({
  key: 'modalState',
  default: false,
})

export const useCommentModalState = () => useRecoilState(commentModalState)
export const useSetCommentModalState = () =>
  useSetRecoilState(commentModalState)

export const postIdState = atom({
  key: 'postIdState',
  default: '',
})

export const usePostIdState = () => useRecoilState(postIdState)
export const usePostIdValue = () => useRecoilValue(postIdState)
export const useSetPostIdState = () => useSetRecoilState(postIdState)
