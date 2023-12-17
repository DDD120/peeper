'use client'

import { useSession } from 'next-auth/react'
import Header from '../Header'

function ProfileHeader() {
  const { data: session } = useSession()
  return <Header heading={session?.user.name ?? ''} isBackButton />
}

export default ProfileHeader
