'use client'

import Sidebar from '@/components/common/sidebar/Sidebar'
import CommentInputModal from '@/components/home/CommentInputModal'
import Feed from '@/components/home/Feed'
import BasicLaout from '@/components/layout/BasicLaout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) router.push('/login')
  }, [session, router])

  return (
    <BasicLaout>
      <Feed />
      <CommentInputModal />
    </BasicLaout>
  )
}
