'use client'

import React, { useState } from 'react'
import BasicInputModal from '../inputModal/BasicInputModal'
import { Button, Show } from '@chakra-ui/react'
import { createPost } from '@/apis/post'
import { CreatePostPropsType } from '@/types/type'

function WritePost() {
  const [isOpen, setIsOpen] = useState(false)

  const handleModalClose = () => {
    setIsOpen(false)
  }

  const onButtonClick = () => {
    setIsOpen(true)
  }

  const onModalButtonClick = async (
    data: Omit<CreatePostPropsType, 'upperPostId'>
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
        isOpen={isOpen}
        heading='Peep'
        placeholder='무슨 일이 일어나고 있나요?'
        handleButtonClick={onModalButtonClick}
        handleModalClose={handleModalClose}
      />
    </Show>
  )
}

export default WritePost
