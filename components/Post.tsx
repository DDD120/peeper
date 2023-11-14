import { useEffect, useState } from 'react'
import {
  PiChatTeardropDuotone as ChatIcon,
  PiDotsThreeOutlineDuotone as DotsIcon,
  PiTrashDuotone as TrashIcon,
  PiHeart as LineHeartIcon,
  PiHeartDuotone as FillHeartIcon,
} from 'react-icons/pi'
import { useModalState, usePostIdState } from '@/atoms/modalAtom'
import { Likes, PostType } from '@/types/posts'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  theme,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { deletePost, getLikesByPost, likePost, unlikePost } from '@/apis/posts'
import { useSession } from 'next-auth/react'
import { onSnapshot } from 'firebase/firestore'

interface Props {
  id: string
  post: PostType
}

function Post({ id, post }: Props) {
  const [isOpen, setIsOpen] = useModalState()
  const [postId, setPostId] = usePostIdState()
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState<Likes[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleChatClick = () => {
    setIsOpen(true)
  }

  const handleHeartClick = async () => {
    setIsLiked(!isLiked)
    if (isLiked) {
      await unlikePost({
        postId: id,
        userId: session?.user.uid,
      })
    } else {
      await likePost({
        postId: id,
        userId: session?.user.uid,
      })
    }
  }

  const handleTrashClick = () => {
    deletePost(id)
    router.replace('/')
  }

  useEffect(() => {
    onSnapshot(getLikesByPost(id), (snapshot) => {
      const likesbyPost = snapshot.docs.map((doc) => {
        const user = doc.data()
        if (user.userId === session?.user.uid) setIsLiked(true)

        return {
          id: doc.id,
          ...doc.data(),
        } as Likes
      })
      setLikes(likesbyPost)
    })
  }, [id, session])

  return (
    <Card direction='row' variant='outline' w='full' border='none'>
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
              color={theme.colors.blackAlpha[700]}
            >
              @{post.tag}
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
                icon={<ChatIcon size={20} />}
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
