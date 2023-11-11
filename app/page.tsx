'use client'

import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
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
    <>
      <Sidebar />
      <Feed />
    </>
  )
}
