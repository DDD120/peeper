'use client'

import { useEffect, useState } from 'react'
import { Flex, Stack, Heading, Icon, Divider } from '@chakra-ui/react'
import { PiShootingStarDuotone } from 'react-icons/pi'
import { PostType } from '@/types/type'
import { onSnapshot } from 'firebase/firestore'
import PostInput from './PostInput'
import { getPostsQuery } from '@/apis/post'
import Post from '../common/post/Post'

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
        py={4}
        position='sticky'
        top={0}
        zIndex={9}
        backgroundColor='#fff'
      >
        <Heading as='h2' size={{ sm: 'sm', lg: 'md' }}>
          홈
        </Heading>
        <Flex>
          <Icon w={6} h={6} as={PiShootingStarDuotone} />
        </Flex>
      </Flex>
      <PostInput />
      <Divider my={4} />
      <Stack divider={<Divider />} my={4}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Stack>
    </>
  )
}

export default Feed
