"use client"

import { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Textarea,
  theme,
} from "@chakra-ui/react"
import { PiSmileyDuotone } from "react-icons/pi"
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
} from "emoji-picker-react"

function Input() {
  const [input, setInput] = useState("")
  const [isShowEmojis, setIsShowEmojis] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendPost = () => {
    if (isLoading) return
    setIsLoading(true)
  }

  const addEmoji = (emojiData: EmojiClickData) => {
    setInput((prev) => prev + emojiData.emoji)
  }

  return (
    <Flex gap={4}>
      <Avatar size="sm" cursor="pointer" m={2} />
      <Box w="full">
        <Textarea
          placeholder="What's a happening?"
          variant="unstyled"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Flex justifyContent="space-between" mt={2}>
          <IconButton
            size="xs"
            aria-label="select emoji"
            icon={<PiSmileyDuotone size="100%" />}
            variant="unstyled"
            onClick={() => setIsShowEmojis(!isShowEmojis)}
          />
          {isShowEmojis && (
            <Box position="absolute" mt="32px" ml="-64px">
              <EmojiPicker
                onEmojiClick={addEmoji}
                skinTonesDisabled
                emojiStyle={EmojiStyle.NATIVE}
                suggestedEmojisMode={SuggestionMode.RECENT}
              />
            </Box>
          )}
          <Button
            isDisabled={!input.trim()}
            backgroundColor={theme.colors.blackAlpha[200]}
          >
            Peep
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Input
