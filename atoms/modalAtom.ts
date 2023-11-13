import { atom, useRecoilState } from 'recoil'

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
