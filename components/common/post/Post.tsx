import { PostType } from '@/types/type'
import {
  Avatar,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { formatDate } from '@/utils/date'
import PostActionBar from './PostActionBar'
import PostMenu from './PostMenu'
import { useRouter } from 'next/navigation'
import Tooltip from '../Tooltip'

interface Props {
  post: PostType
}

function Post({ post }: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  const date = post.createAt?.toDate()

  return (
    <Card
      as='article'
      direction='row'
      variant='outline'
      w='full'
      border='none'
      cursor='pointer'
      _hover={{
        backgroundColor: 'gray.50',
      }}
      onClick={() =>
        router.push(`/${session?.user.tag}/post/${post.id}`, { scroll: false })
      }
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
            <Text fontSize='xs' as='span' lineHeight={1.5}>
              ·{' '}
            </Text>
            <Tooltip
              label={
                date &&
                formatDate({
                  type: 'time-date',
                  date,
                })
              }
            >
              <Text
                fontSize='xs'
                as='span'
                lineHeight={1.5}
                color='blackAlpha.700'
                _hover={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                {date &&
                  formatDate({
                    date,
                    type: 'distanceToNow',
                  })}
              </Text>
            </Tooltip>
          </Flex>
          <Text>{post.text}</Text>
          <PostActionBar postId={post.id} />
        </Stack>
      </CardBody>
      <PostMenu postId={post.id} userId={post.userId} />
    </Card>
  )
}

export default Post
