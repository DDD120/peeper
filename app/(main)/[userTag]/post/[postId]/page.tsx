import { getPost } from '@/apis/post'
import Header from '@/components/common/Header'
import CommentInputModal from '@/components/common/inputModal/CommentInputModal'
import CommentInput from '@/components/post/CommentInput'
import PostCommnents from '@/components/post/PostCommnents'
import PostMain from '@/components/post/PostMain'
import { PostType } from '@/types/type'
import { Box } from '@chakra-ui/react'
import { Metadata } from 'next'

function PostPage({}) {
  return (
    <>
      <Header heading='Peep' isBackButton />
      <Box h='6000px'>
        <PostMain />
        <CommentInput />
        <PostCommnents />
      </Box>
      <CommentInputModal />
    </>
  )
}

export default PostPage

type Props = {
  params: { postId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postSnap = await getPost(params.postId)
  const post = postSnap.data() as PostType

  return {
    title: `${post?.username} on Peeper "${post?.text}"`,
  }
}
