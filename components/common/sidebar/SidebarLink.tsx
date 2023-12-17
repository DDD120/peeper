import NextLink from 'next/link'
import { Flex, Link, ListIcon, ListItem, Show } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib/esm/iconBase'

interface Props {
  to: string
  label: string
  Icon: IconType
  active?: boolean
}

function SidebarLink({ to, label, Icon, active }: Props) {
  return (
    <ListItem>
      <Link as={NextLink} href={to} scroll={false}>
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
            backgroundColor: 'gray.100',
          }}
          _active={{
            backgroundColor: 'gray.200',
          }}
        >
          <ListIcon w={8} h={8} mr={0}>
            <Icon size='100%' />
          </ListIcon>
          <Show above='lg'>{label}</Show>
        </Flex>
      </Link>
    </ListItem>
  )
}

export default SidebarLink
