import { Flex, List, ListItem, Box, Heading } from '@chakra-ui/react'
import { PiBirdDuotone } from 'react-icons/pi'
import WithGoogle from '@/components/login/withGoogle'

function LoginPage() {
  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      h='full'
      gap={4}
    >
      <Box>
        <PiBirdDuotone size={48} />
      </Box>
      <Heading>로그인</Heading>
      <List>
        <ListItem>
          <WithGoogle />
        </ListItem>
      </List>
    </Flex>
  )
}

export default LoginPage
