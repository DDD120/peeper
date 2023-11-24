import { getPost } from '@/apis/post'
import { PostType } from '@/types/type'
import { Metadata } from 'next'

function PostPage({}) {
  return <>post page</>
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
