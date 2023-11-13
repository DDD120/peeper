import { useState } from 'react'
import {
  PiChatTeardropDuotone as ChatIcon,
  PiDotsThreeOutlineDuotone as DotsIcon,
  PiTrashDuotone as TrashIcon,
} from 'react-icons/pi'
import { useModalState, usePostIdState } from '@/atoms/modalAtom'
import { PostType } from '@/types/posts'
import {
  Avatar,
  Box,
  Card,
  CardBody,
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
import { deletePost } from '@/apis/posts'
import { useSession } from 'next-auth/react'

interface Props {
  id: string
  post: PostType
}

function Post({ id, post }: Props) {
  const [isOpen, setIsOpen] = useModalState()
  const [postId, setPostId] = usePostIdState()
  const [comments, setComments] = useState([])
  const { data: session } = useSession()
  const router = useRouter()

  const handleChatClick = () => {
    setIsOpen(true)
  }

  const handleTrashClick = () => {
    deletePost(id)
    router.replace('/')
  }

  return (
    <Card direction='row' variant='outline' w='full' border='none'>
      <CardBody display='flex' gap={4}>
        <Avatar name={post.username} src={post.userImg} size='sm' />
        <Stack>
          <Flex gap={1}>
            <Heading as='h4' size='sm'>
              {post.username}
            </Heading>
            <Text fontSize='xs' color={theme.colors.blackAlpha[600]}>
              @{post.tag}
            </Text>
          </Flex>
          <Text>{post.text}</Text>
          <HStack>
            <Box>
              <IconButton
                aria-label='chat button'
                variant='unstyled'
                boxSize={6}
                onClick={handleChatClick}
              >
                <ChatIcon />
              </IconButton>
              {comments.length > 0 && <Text as='span'>{comments.length}</Text>}
            </Box>
          </HStack>
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
