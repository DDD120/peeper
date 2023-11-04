import { ListIcon, ListItem, Show, theme } from "@chakra-ui/react"
import { IconType } from "react-icons/lib/esm/iconBase"

interface Props {
  text: string
  Icon: IconType
  active?: boolean
}

function SidebarLink({ text, Icon, active }: Props) {
  return (
    <ListItem
      display="flex"
      gap={2}
      alignItems="center"
      fontWeight={active ? 700 : 400}
      transition={"all 0.3s"}
      padding={2}
      _hover={{
        cursor: "pointer",
        backgroundColor: theme.colors.gray[200],
        borderRadius: "4px",
      }}
      _active={{
        backgroundColor: theme.colors.gray[300],
      }}
    >
      <ListIcon as={Icon} w={8} h={8} mr={0} />
      <Show above="lg">{text}</Show>
    </ListItem>
  )
}

export default SidebarLink
