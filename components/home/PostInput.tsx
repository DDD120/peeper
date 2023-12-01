'use client'

import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Textarea,
} from '@chakra-ui/react'
import { PiSmileyDuotone } from 'react-icons/pi'
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
} from 'emoji-picker-react'
import { useSession } from 'next-auth/react'
import { createPost } from '@/apis/post'

function PostInput() {
  const [value, setValue] = useState('')
  const [isShowEmojis, setIsShowEmojis] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()

  const onButtonClick = async () => {
    if (!session || isLoading) return
    setIsLoading(true)

    await createPost({
      upperPostId: null,
      userId: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: value,
    })
    setIsLoading(false)
    setIsShowEmojis(false)
    setValue('')
  }

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue((prev) => prev + emojiData.emoji)
  }

  return (
    <Flex gap={4} opacity={isLoading ? 0.6 : 1}>
      <Avatar
        name={session?.user.name!}
        src={session?.user.image!}
        size='sm'
        cursor='pointer'
        m={2}
      />
      <Box w='full'>
        <Textarea
          placeholder='무슨 일이 일어나고 있나요?'
          variant='unstyled'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Flex justifyContent='space-between' mt={2}>
          <IconButton
            size='xs'
            aria-label='select emoji'
            icon={<PiSmileyDuotone size='100%' />}
            variant='unstyled'
            onClick={() => setIsShowEmojis(!isShowEmojis)}
          />
          {isShowEmojis && (
            <Box position='absolute' mt='32px' ml='-64px' zIndex={9}>
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                skinTonesDisabled
                emojiStyle={EmojiStyle.NATIVE}
                suggestedEmojisMode={SuggestionMode.RECENT}
              />
            </Box>
          )}
          <Button
            onClick={onButtonClick}
            isDisabled={!value.trim() || isLoading}
            backgroundColor='blackAlpha.200'
          >
            Peep
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default PostInput
