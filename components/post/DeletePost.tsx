import usePostAction from '@/hooks/usePostAction'
import { Box, Card, CardBody } from '@chakra-ui/react'
import Post from '../common/post/Post'

interface Props {
  postId?: string
}

function DeletePost({ postId }: Props) {
  const { comments } = usePostAction(postId)

  return (
    <>
      <Card variant='filled'>
        <CardBody>이 게시물은 작성자에 의해 삭제되었습니다.</CardBody>
      </Card>
      {comments.length && !comments[0].deleteAt && (
        <Box position='relative' mt={1}>
          <Post post={comments[0]} />
          <Box
            position='absolute'
            top={0}
            left='34px'
            w={1}
            h={4}
            backgroundColor='gray.200'
          ></Box>
        </Box>
      )}
    </>
  )
}

export default DeletePost
