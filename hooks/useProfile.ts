import { getUser, getUserId } from '@/apis/user'
import { ProfileType } from '@/types/type'
import { useEffect, useState } from 'react'

function useProfile(userTag: string) {
  const [profile, setProfile] = useState<ProfileType>()
  useEffect(() => {
    const get = async () => {
      const userIdSnap = await getUserId(userTag)
      const tag = userIdSnap.data() as { userId: string }
      const userSnap = await getUser(tag.userId)
      setProfile(userSnap.data() as ProfileType)
    }

    get()
  }, [userTag])

  return { profile }
}

export default useProfile
