import { MouseEvent, useEffect, useState } from 'react'
import {
  PiChatTeardrop as LineChatIcon,
  PiChatTeardropDuotone as FillChatIcon,
  PiDotsThreeOutlineDuotone as DotsIcon,
  PiTrashDuotone as TrashIcon,
  PiHeart as LineHeartIcon,
  PiHeartDuotone as FillHeartIcon,
} from 'react-icons/pi'
import { useSetModalState, useSetPostIdState } from '@/atoms/modalAtom'
import { CommentType, LikeType, PostType } from '@/types/type'
import {
  Avatar,
  Box,
  Card,
  CardBody,
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
import { useRouter } from 'next/navigation'
import { deletePost } from '@/apis/post'
import { useSession } from 'next-auth/react'
import { onSnapshot } from 'firebase/firestore'
import { getLikesByPostQuery, likePost, unlikePost } from '@/apis/like'
import { getCommentsQuery } from '@/apis/comment'
import { formatDate } from '@/utils/date'

interface Props {
  id: string
  post: PostType
}

function Post({ id, post }: Props) {
  const setIsOpen = useSetModalState()
  const setPostId = useSetPostIdState()
  const [comments, setComments] = useState<CommentType[]>([])
  const [likes, setLikes] = useState<LikeType[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [hasMyComment, setHasMyComment] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleChatClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsOpen(true)
    setPostId(id)
  }

  const handleHeartClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!session || !session.user.uid) return
    setIsLiked(!isLiked)
    if (isLiked) {
      await unlikePost({
        postId: id,
        userId: session.user.uid,
      })
    } else {
      await likePost({
        postId: id,
        userId: session.user.uid,
      })
    }
  }

  const handleTrashClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deletePost(id)
    router.replace('/')
  }

  useEffect(() => {
    onSnapshot(getCommentsQuery(id), (snapshot) => {
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
    onSnapshot(getLikesByPostQuery(id), (snapshot) => {
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
  }, [id, session])

  return (
    <Card
      direction='row'
      variant='outline'
      w='full'
      border='none'
      cursor='pointer'
      onClick={() => router.push(`/${session?.user.tag}/post/${id}`)}
      _hover={{
        backgroundColor: 'gray.50',
      }}
    >
      <CardBody display='flex' gap={4}>
        <Avatar name={post.username} src={post.userImg} size='sm' />
        <Stack>
          <Flex gap={1} alignItems='flex-end'>
            <Heading as='h4' size='sm'>
              {post.username}
            </Heading>
            <Text
              fontSize='xs'
              as='span'
              lineHeight={1.5}
              color='blackAlpha.700'
            >
              @{post.tag}
            </Text>
            <Text
              fontSize='xs'
              as='span'
              lineHeight={1.5}
              color='blackAlpha.700'
            >
              · {post.timestamp && formatDate(post.timestamp.toDate())}
            </Text>
          </Flex>
          <Text>{post.text}</Text>
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
      </CardBody>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<DotsIcon />}
          variant='unstyled'
          onClick={(e) => e.stopPropagation()}
        />
        <MenuList>
          {session?.user.uid === post.userId && (
            <MenuItem icon={<TrashIcon size={24} />} onClick={handleTrashClick}>
              핍 삭제하기
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Card>
  )
}

export default Post
