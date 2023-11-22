'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Stack, Heading, Icon, Divider } from '@chakra-ui/react'
import { PiShootingStarDuotone } from 'react-icons/pi'
import { PostType } from '@/types/type'
import { onSnapshot } from 'firebase/firestore'
import PostInput from './PostInput'
import Post from './Post'
import { getPostsQuery } from '@/apis/post'

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    onSnapshot(getPostsQuery(), (snapshot) => {
      const posts = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as PostType)
      )
      setPosts(posts)
    })
  }, [])

  return (
    <>
      <Flex
        justifyContent='space-between'
        px={{ sm: '4px' }}
        py={4}
        position='sticky'
        top={0}
        zIndex={9}
        backgroundColor='#fff'
      >
        <Heading as='h2' size={{ sm: 'sm', lg: 'md' }}>
          Home
        </Heading>
        <Flex>
          <Icon w={6} h={6} as={PiShootingStarDuotone} />
        </Flex>
      </Flex>
      <PostInput />
      <Divider my={4} />
      <Stack divider={<Divider />} my={4}>
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post} />
        ))}
      </Stack>
    </>
  )
}

export default Feed
