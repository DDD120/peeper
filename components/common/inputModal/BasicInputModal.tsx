import { CreatePostProps } from '@/types/type'
import {
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  Flex,
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
  Textarea,
  Avatar,
} from '@chakra-ui/react'
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
} from 'emoji-picker-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { PiSmileyDuotone as SmileyIcon } from 'react-icons/pi'

interface Props {
  isOpen: boolean
  children?: React.ReactNode
  heading: string
  placeholder: string
  handleButtonClick: (data: Omit<CreatePostProps, 'upperPostId'>) => void
  handleModalClose: () => void
}

function BasicInputModal({
  isOpen,
  children,
  heading,
  placeholder,
  handleModalClose,
  handleButtonClick,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isShowEmojis, setIsShowEmojis] = useState(false)
  const [value, setValue] = useState('')
  const { data: session } = useSession()

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue((prev) => prev + emojiData.emoji)
  }

  const onModalClose = () => {
    handleModalClose()
    setValue('')
  }

  const onButtonClick = () => {
    if (!session || isLoading) return
    setIsLoading(true)
    const data = {
      text: value,
      userId: session.user.uid,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
    }
    handleButtonClick(data)
    handleModalClose()
    setIsLoading(false)
    setIsShowEmojis(false)
    setValue('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton onClick={onModalClose} />
        <ModalBody>
          {children}
          <Flex gap={4}>
            <Avatar
              name={session?.user.name!}
              src={session?.user.image!}
              size='sm'
            />
            <Textarea
              placeholder={placeholder}
              variant='unstyled'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Flex>
        </ModalBody>
        <ModalFooter w='full' position='relative'>
          <Flex
            grow={1}
            justifyContent='space-between'
            alignItems='center'
            mt={2}
          >
            <IconButton
              size='xs'
              aria-label='select emoji'
              icon={<SmileyIcon size='100%' />}
              variant='unstyled'
              onClick={() => setIsShowEmojis(!isShowEmojis)}
            />
            {isShowEmojis && (
              <Box position='absolute' top='60px'>
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
              isDisabled={!value.trim()}
              backgroundColor='blackAlpha.200'
            >
              Peep
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BasicInputModal
