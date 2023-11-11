import { PostType } from '@/types/posts'
import {
  Avatar,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
  theme,
} from '@chakra-ui/react'

interface Props {
  post: PostType
}

function Post({ post }: Props) {
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
        </Stack>
      </CardBody>
    </Card>
  )
}

export default Post
