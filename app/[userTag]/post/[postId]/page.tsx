import { getPost } from '@/apis/post'
import CommentInputModal from '@/components/common/CommentInputModal'
import Post from '@/components/post/Post'
import PostCommnets from '@/components/post/PostCommnets'
import PostHeader from '@/components/post/PostHeader'
import { PostType } from '@/types/type'
import { Metadata } from 'next'

function PostPage({}) {
  return (
    <>
      <PostHeader />
      <Post />
      <PostCommnets />
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
