'use client'

import CommentInputModal from '@/components/common/CommentInputModal'
import Feed from '@/components/home/Feed'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function HomePage() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) router.push('/login')
  }, [session, router])

  return (
    <>
      <Feed />
      {/* <CommentInputModal /> */}
    </>
  )
}

export default HomePage
