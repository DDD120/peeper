'use client'

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
import { PiCalendarBlankDuotone as CalendarIcon } from 'react-icons/pi'

function ProfileInfo() {
  const { data: session } = useSession()

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
          <Avatar
            size='full'
            name={session?.user.name!}
            src={session?.user.image!}
          />
        </Circle>
        <Flex justifyContent='flex-end'>
          <Button variant='outline'>프로필 수정</Button>
        </Flex>
        <Stack mt={4} spacing={3}>
          <Box>
            <Heading as='h4' size='lg'>
              {session?.user.name}
            </Heading>
            <Text>@{session?.user.tag}</Text>
          </Box>
          <Text>자기소개</Text>
          <Flex gap={2} alignItems='center'>
            <CalendarIcon />
            <Text>가입일 : 2022년 08월 23일</Text>
          </Flex>
          <Flex gap={4}>
            <Text>
              <Text as='span' fontWeight={700}>
                100
              </Text>{' '}
              팔로잉
            </Text>
            <Text>
              <Text as='span' fontWeight={700}>
                101
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
