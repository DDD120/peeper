'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Stack, Heading, Icon, Divider } from '@chakra-ui/react'
import { PiShootingStarDuotone } from 'react-icons/pi'
import Input from './Input'
import { getPosts } from '@/apis/posts'
import { PostType } from '@/types/posts'
import Post from './Post'
import { onSnapshot } from 'firebase/firestore'

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    onSnapshot(getPosts(), (snapshot) => {
      const peepPosts = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as PostType)
      )
      setPosts(peepPosts)
    })
  }, [])

  console.log(posts)

  return (
    <Box flexGrow={1} ml={{ sm: '80px', lg: '260px' }} h={'full'}>
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
      <Input />
      <Divider my={4} />
      <Stack divider={<Divider />} my={4}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Stack>
    </Box>
  )
}

export default Feed
