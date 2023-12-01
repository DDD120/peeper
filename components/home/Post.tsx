import NextLink from 'next/link'
import { CommentType, PostType } from '@/types/type'
import {
  Avatar,
  Card,
  CardBody,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { formatDate } from '@/utils/date'
import PostActionBar from '../common/post/PostActionBar'
import PostMenu from '../common/post/PostMenu'

interface Props {
  post: PostType | CommentType
}

function Post({ post }: Props) {
  const { data: session } = useSession()

  return (
    <Link
      as={NextLink}
      href={`/${session?.user.tag}/post/${post.id}`}
      scroll={false}
      _hover={{ textDecoration: 'none' }}
    >
      <Card
        direction='row'
        variant='outline'
        w='full'
        border='none'
        cursor='pointer'
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
        <PostMenu postId={post.id} userId={post.userId} />
      </Card>
    </Link>
  )
}

export default Post
