'use client'

import { getCommentsQuery } from '@/apis/comment'
import { getLikesByPostQuery, likePost, unlikePost } from '@/apis/like'
import { deletePost, getPostRef } from '@/apis/post'
import { useSetModalState, useSetPostIdState } from '@/atoms/modalAtom'
import { CommentType, LikeType, PostType } from '@/types/type'
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
  PiChatTeardrop as LineChatIcon,
  PiChatTeardropDuotone as FillChatIcon,
  PiDotsThreeOutlineDuotone as DotsIcon,
  PiTrashDuotone as TrashIcon,
  PiHeart as LineHeartIcon,
  PiHeartDuotone as FillHeartIcon,
} from 'react-icons/pi'

function Post() {
  const setIsOpen = useSetModalState()
  const setPostId = useSetPostIdState()
  const [post, setPost] = useState<PostType>()
  const [comments, setComments] = useState<CommentType[]>([])
  const [likes, setLikes] = useState<LikeType[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [hasMyComment, setHasMyComment] = useState(false)
  const { postId } = useParams<{ postId: string }>()
  const { data: session } = useSession()
  const router = useRouter()

  const handleChatClick = () => {
    setIsOpen(true)
    setPostId(postId)
  }

  const handleHeartClick = async () => {
    if (!session || !session.user.uid) return
    setIsLiked(!isLiked)
    if (isLiked) {
      await unlikePost({
        postId,
        userId: session.user.uid,
      })
    } else {
      await likePost({
        postId,
        userId: session.user.uid,
      })
    }
  }

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

  useEffect(() => {
    onSnapshot(getCommentsQuery(postId), (snapshot) => {
      const comments = snapshot.docs.map((doc) => {
        const data = doc.data()
        if (data.userId === session?.user.uid) setHasMyComment(true)

        return {
          id: doc.id,
          ...data,
        } as CommentType
      })
      setComments(comments)
    })
    onSnapshot(getLikesByPostQuery(postId), (snapshot) => {
      const likes = snapshot.docs.map((doc) => {
        const data = doc.data()
        if (data.userId === session?.user.uid) setIsLiked(true)

        return {
          id: doc.id,
          ...data,
        } as LikeType
      })
      setLikes(likes)
    })
  }, [postId, session])

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
          <Flex mt={4} gap={4}>
            <Box>
              <IconButton
                aria-label='chat button'
                variant='ghost'
                size='md'
                onClick={handleChatClick}
                icon={
                  hasMyComment ? (
                    <FillChatIcon size={20} />
                  ) : (
                    <LineChatIcon size={20} />
                  )
                }
              />
              {comments.length > 0 && <Text as='span'>{comments.length}</Text>}
            </Box>
            <Box>
              <IconButton
                aria-label='line heart button'
                variant='ghost'
                size='md'
                onClick={handleHeartClick}
                icon={
                  isLiked ? (
                    <FillHeartIcon size={20} />
                  ) : (
                    <LineHeartIcon size={20} />
                  )
                }
              />
              {likes.length > 0 && <Text as='span'>{likes.length}</Text>}
            </Box>
          </Flex>
        </Stack>
      </CardFooter>
    </Card>
  )
}

export default Post
