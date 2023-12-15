import usePostAction from '@/hooks/usePostAction'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import {
  PiDotsThreeOutlineDuotone as DotsIcon,
  PiTrashDuotone as TrashIcon,
} from 'react-icons/pi'
import Tooltip from '../Tooltip'

interface Props {
  postId: string
  userId: string | undefined
}

function PostMenu({ postId, userId }: Props) {
  const { handleTrashClick } = usePostAction(postId)
  const { data: session } = useSession()

  return (
    <Menu>
      <Tooltip label='더보기'>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<DotsIcon />}
          variant='unstyled'
          onClick={(e) => e.stopPropagation()}
        />
      </Tooltip>
      <MenuList>
        {session?.user.uid === userId && (
          <MenuItem icon={<TrashIcon size={24} />} onClick={handleTrashClick}>
            핍 삭제하기
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}

export default PostMenu
