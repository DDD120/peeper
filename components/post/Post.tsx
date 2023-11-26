'use client'

import { deletePost, getPostRef } from '@/apis/post'
import { PostType } from '@/types/type'
import { formatDate } from '@/utils/date'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import { onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  PiDotsThreeOutlineDuotone as DotsIcon,
  PiTrashDuotone as TrashIcon,
} from 'react-icons/pi'
import PostActionBar from '../common/post/PostActionBar'

function Post() {
  const [post, setPost] = useState<PostType>()
  const { postId } = useParams<{ postId: string }>()
  const { data: session } = useSession()
  const router = useRouter()

  const handleTrashClick = () => {
    deletePost(postId)
    router.replace('/')
  }

  useEffect(() => {
    if (!postId) return
    onSnapshot(getPostRef(postId), (snapshot) => {
      setPost({
        id: snapshot.id,
        ...snapshot.data(),
      } as PostType)
    })
  }, [postId])

  return (
    <Card variant='outline' border='none'>
      <CardHeader>
        <Flex justifyContent='space-between'>
          <Flex gap={2}>
            <Avatar name={post?.username} src={post?.userImg} size='sm' />
            <Box>
              <Heading as='h4' size='sm'>
                {post?.username}
              </Heading>
              <Text fontSize='xs'>@{post?.tag}</Text>
            </Box>
          </Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<DotsIcon />}
              variant='unstyled'
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList>
              {session?.user.uid === post?.userId && (
                <MenuItem
                  icon={<TrashIcon size={24} />}
                  onClick={handleTrashClick}
                >
                  핍 삭제하기
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{post?.text}</Text>
      </CardBody>
      <CardFooter>
        <Stack>
          <Text fontSize='sm'>
            {post?.timestamp &&
              formatDate({
                date: post.timestamp.toDate(),
              })}
          </Text>
          <PostActionBar postId={postId} />
        </Stack>
      </CardFooter>
    </Card>
  )
}

export default Post
