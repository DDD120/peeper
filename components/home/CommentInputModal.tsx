import { getPost } from '@/apis/post'
import { createComment } from '@/apis/comment'
import { useModalState, usePostIdState } from '@/atoms/modalAtom'
import { PostType } from '@/types/type'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  theme,
} from '@chakra-ui/react'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { PiSmileyDuotone } from 'react-icons/pi'
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
} from 'emoji-picker-react'

function CommentInputModal() {
  const [value, setValue] = useState('')
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useModalState()
  const [isShowEmojis, setIsShowEmojis] = useState(false)
  const [postId, setPostId] = usePostIdState()
  const [post, setPost] = useState<PostType | null>(null)

  const onModalCloes = () => {
    setValue('')
    setPost(null)
    setPostId('')
    setIsOpen(false)
  }

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue((prev) => prev + emojiData.emoji)
  }

  const onButtonClick = async () => {
    if (!session) return
    await createComment({
      postId,
      comment: value,
      userId: session.user.uid,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
    })
    setIsOpen(false)
    setValue('')
  }

  useEffect(() => {
    if (!postId) return
    onSnapshot(getPost(postId), (snapshot) => {
      setPost({
        id: postId,
        ...snapshot.data(),
      } as PostType)
    })
  }, [postId])

  return (
    <Modal isOpen={isOpen} onClose={onModalCloes}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>답글</ModalHeader>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <ModalBody>
          <Flex gap={4} pb={2} position='relative'>
            <Avatar name={post?.username} src={post?.userImg} size='sm' />
            <Box
              w='2px'
              h='full'
              top={0}
              left={4}
              position='absolute'
              backgroundColor={theme.colors.blackAlpha[200]}
              zIndex={-1}
            />
            <Box>
              <Flex gap={1} alignItems='flex-end'>
                <Heading as='h4' size='sm'>
                  {post?.username}
                </Heading>
                <Text
                  fontSize='xs'
                  as='span'
                  lineHeight={1.5}
                  color={theme.colors.blackAlpha[700]}
                >
                  @{post?.tag}
                </Text>
              </Flex>
              <Text>{post?.text}</Text>
            </Box>
          </Flex>
          <Flex gap={4}>
            <Avatar
              name={session?.user.name!}
              src={session?.user.image!}
              size='sm'
            />
            <Textarea
              placeholder="What's a happening?"
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
              icon={<PiSmileyDuotone size='100%' />}
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
              backgroundColor={theme.colors.blackAlpha[200]}
            >
              Peep
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CommentInputModal