import { useState } from 'react'
import { PiChatTeardropDuotone as ChatIcon } from 'react-icons/pi'
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
  Stack,
  Text,
  theme,
} from '@chakra-ui/react'

interface Props {
  post: PostType
}

function Post({ post }: Props) {
  const [isOpen, setIsOpen] = useModalState()
  const [postId, setPostId] = usePostIdState()
  const [comments, setComments] = useState([])

  const handleChatClick = () => {
    setIsOpen(true)
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
    </Card>
  )
}

export default Post
