'use client'

import React from 'react'
import BasicInputModal from '../inputModal/BasicInputModal'
import { Button, Show } from '@chakra-ui/react'
import { useSetModalState } from '@/atoms/modalAtom'
import { createPost } from '@/apis/post'
import { CreatePostProps } from '@/types/type'

function WritePost() {
  const setIsOpen = useSetModalState()

  const onButtonClick = () => {
    setIsOpen(true)
  }

  const onModalButtonClick = async (
    data: Omit<CreatePostProps, 'upperPostId'>
  ) => {
    await createPost({
      upperPostId: null,
      ...data,
    })
  }

  return (
    <Show above='lg'>
      <Button
        w='full'
        h='52px'
        flexShrink={0}
        rounded='full'
        backgroundColor='blackAlpha.200'
        fontSize='lg'
        onClick={onButtonClick}
      >
        Peep
      </Button>
      <BasicInputModal
        heading='Peep'
        placeholder='무슨 일이 일어나고 있나요?'
        handleButtonClick={onModalButtonClick}
      />
    </Show>
  )
}

export default WritePost
