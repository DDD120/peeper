'use client'

import useProfile from '@/hooks/useProfile'
import { formatDate } from '@/utils/date'
import {
  Box,
  Text,
  Card,
  CardBody,
  Heading,
  Avatar,
  Flex,
  Circle,
  Button,
  Stack,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { PiCalendarBlankDuotone as CalendarIcon } from 'react-icons/pi'

function ProfileInfo() {
  const { data: session } = useSession()
  const { userTag } = useParams<{ userTag: string }>()
  const { profile } = useProfile(userTag)
  if (!profile) return
  const myProfile = session?.user.uid === profile.userId

  return (
    <Card variant='outline'>
      <Box h='200px' bgColor='gray.100'></Box>
      <CardBody position='relative'>
        <Circle
          size='120px'
          p={1}
          bgColor='white'
          position='absolute'
          top='-60px'
        >
          <Avatar size='full' name={profile.username} src={profile.userImg} />
        </Circle>
        {myProfile && (
          <Flex justifyContent='flex-end'>
            <Button variant='outline'>프로필 수정</Button>
          </Flex>
        )}
        <Stack mt={4} spacing={3}>
          <Box>
            <Heading as='h4' size='lg'>
              {profile.username}
            </Heading>
            <Text>@{profile.tag}</Text>
          </Box>
          <Text>{profile.introduction}</Text>
          <Flex gap={2} alignItems='center'>
            <CalendarIcon />
            <Text>
              가입일 :{' '}
              {formatDate({
                type: 'date',
                date: profile.createAt.toDate(),
              })}
            </Text>
          </Flex>
          <Flex gap={4}>
            <Text>
              <Text as='span' fontWeight={700}>
                {profile.followingCount}
              </Text>{' '}
              팔로잉
            </Text>
            <Text>
              <Text as='span' fontWeight={700}>
                {profile.followerCount}
              </Text>{' '}
              팔로워
            </Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default ProfileInfo
