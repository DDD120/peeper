import usePostAction from '@/hooks/usePostAction'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import {
  PiChatTeardrop as LineChatIcon,
  PiChatTeardropDuotone as FillChatIcon,
  PiHeart as LineHeartIcon,
  PiHeartDuotone as FillHeartIcon,
} from 'react-icons/pi'

interface Props {
  postId: string
}

function PostActionBar({ postId }: Props) {
  const {
    comments,
    likes,
    isLiked,
    hasMyComment,
    handleChatClick,
    handleHeartClick,
  } = usePostAction(postId)

  return (
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
            isLiked ? <FillHeartIcon size={20} /> : <LineHeartIcon size={20} />
          }
        />
        {likes.length > 0 && <Text as='span'>{likes.length}</Text>}
      </Box>
    </Flex>
  )
}

export default PostActionBar
