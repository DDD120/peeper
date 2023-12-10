import { Tooltip } from '@chakra-ui/react'

interface Props {
  label: string
  children: React.ReactNode
}

function CustomTooltip({ label, children }: Props) {
  return (
    <Tooltip label={label} openDelay={500}>
      {children}
    </Tooltip>
  )
}

export default CustomTooltip
