'use client'

import { useEffect, useState } from 'react'
import { Stack, Divider } from '@chakra-ui/react'
import { PostType } from '@/types/type'
import { onSnapshot } from 'firebase/firestore'
import { getPostsQuery } from '@/apis/post'
import Post from '../common/post/Post'
import PostInput from '../common/post/PostInput'
import HomeHeader from './HomeHeader'

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
      <HomeHeader />
      <PostInput placeholder='무슨 일이 일어나고 있나요?' />
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
