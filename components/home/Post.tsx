import {
  PiDotsThreeOutlineDuotone as DotsIcon,
  PiTrashDuotone as TrashIcon,
} from 'react-icons/pi'
import { PostType } from '@/types/type'
import {
  Avatar,
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
import { useSession } from 'next-auth/react'
import { formatDate } from '@/utils/date'
import PostActionBar from '../common/post/PostActionBar'
import usePostAction from '@/hooks/usePostAction'

interface Props {
  post: PostType
}

function Post({ post }: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  const { handleTrashClick } = usePostAction(post.id)

  return (
    <Card
      direction='row'
      variant='outline'
      w='full'
      border='none'
      cursor='pointer'
      onClick={() => router.push(`/${session?.user.tag}/post/${post.id}`)}
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
              ·{' '}
              {post.timestamp &&
                formatDate({
                  date: post.timestamp.toDate(),
                  type: 'distanceToNow',
                })}
            </Text>
          </Flex>
          <Text>{post.text}</Text>
          <PostActionBar postId={post.id} />
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
