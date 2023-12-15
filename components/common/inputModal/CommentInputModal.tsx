'use client'

import { getPostRef } from '@/apis/post'
import { createComment } from '@/apis/comment'
import { useCommentModalState, usePostIdState } from '@/atoms/modalAtom'
import { CreatePostPropsType, PostType } from '@/types/type'
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BasicInputModal from './BasicInputModal'

function CommentInputModal() {
  const [isOpen, setIsOpen] = useCommentModalState()
  const [postId, setPostId] = usePostIdState()
  const [post, setPost] = useState<PostType | null>(null)

  const handleModalCloes = () => {
    setIsOpen(false)
    setPost(null)
    setPostId('')
  }

  const onButtonClick = async (
    data: Omit<CreatePostPropsType, 'upperPostId'>
  ) => {
    await createComment({
      upperPostId: postId,
      ...data,
    })
  }

  useEffect(() => {
    if (!postId) return
    onSnapshot(getPostRef(postId), (snapshot) => {
      setPost({
        id: postId,
        ...snapshot.data(),
      } as PostType)
    })
  }, [postId])

  return (
    <BasicInputModal
      isOpen={isOpen}
      heading='답글'
      placeholder={`@${postId}님에게 답글 달기`}
      handleButtonClick={onButtonClick}
      handleModalClose={handleModalCloes}
    >
      <Flex gap={4} pb={2} position='relative'>
        <Avatar name={post?.username} src={post?.userImg} size='sm' />
        <Box
          w='2px'
          h='full'
          top={0}
          left={4}
          position='absolute'
          backgroundColor='blackAlpha.200'
          zIndex={-1}
        />
        <Box>
          <Flex gap={1} alignItems='flex-end'>
            <Heading as='h4' size='sm'>
              {post?.username}
            </Heading>
            <Text
              fontSize='xs'
              as='span'
              lineHeight={1.5}
              color='blackAlpha.700'
            >
              @{post?.tag}
            </Text>
          </Flex>
          <Text>{post?.text}</Text>
        </Box>
      </Flex>
    </BasicInputModal>
  )
}

export default CommentInputModal
