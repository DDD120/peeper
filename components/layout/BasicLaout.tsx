import { Box } from '@chakra-ui/react'
import Sidebar from '../common/sidebar/Sidebar'

interface Props {
  children: React.ReactNode
}

function BasicLaout({ children }: Props) {
  return (
    <>
      <Sidebar />
      <Box as='main' flexGrow={1} ml={{ sm: '80px', lg: '260px' }} h='full'>
        {children}
      </Box>
    </>
  )
}

export default BasicLaout
