import { Flex, ListIcon, ListItem, Show, theme } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib/esm/iconBase'

interface Props {
  text: string
  Icon: IconType
  active?: boolean
}

function SidebarLink({ text, Icon, active }: Props) {
  return (
    <ListItem>
      <Flex
        display='inline-flex'
        gap={2}
        justifyContent={{ sm: 'center', lg: 'flex-start' }}
        alignItems='center'
        fontWeight={active ? 700 : 400}
        transition={'all 0.3s'}
        py={2}
        px={4}
        cursor='pointer'
        borderRadius='full'
        _hover={{
          backgroundColor: theme.colors.gray[100],
        }}
        _active={{
          backgroundColor: theme.colors.gray[200],
        }}
      >
        <ListIcon w={8} h={8} mr={0}>
          <Icon size='100%' />
        </ListIcon>
        <Show above='lg'>{text}</Show>
      </Flex>
    </ListItem>
  )
}

export default SidebarLink
