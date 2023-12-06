import usePostAction from '@/hooks/usePostAction'
import { Card, CardBody } from '@chakra-ui/react'
import Post from '../common/post/Post'

interface Props {
  postId: string
}

function DeletePost({ postId }: Props) {
  const { comments } = usePostAction(postId)

  return (
    <>
      <Card variant='filled'>
        <CardBody>이 게시물은 작성자에 의해 삭제되었습니다.</CardBody>
      </Card>
      {comments.length && <Post post={comments[0]} />}
    </>
  )
}

export default DeletePost
