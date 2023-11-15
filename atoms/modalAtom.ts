import { atom, useRecoilState, useRecoilValue } from 'recoil'

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const useModalState = () => useRecoilState(modalState)

export const postIdState = atom({
  key: 'postIdState',
  default: '',
})

export const usePostIdState = () => useRecoilState(postIdState)
export const usePostIdValue = () => useRecoilValue(postIdState)
