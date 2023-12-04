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
  Stack,
  Text,
} from '@chakra-ui/react'
import PostMenu from '../common/post/PostMenu'
import PostActionBar from '../common/post/PostActionBar'
import { PostType } from '@/types/type'

interface Props {
  postId: string
  post: PostType | undefined
}

function Post({ postId, post }: Props) {
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
          <PostMenu postId={postId} userId={post?.userId} />
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
