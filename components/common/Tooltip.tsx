import { Tooltip as CTooltip } from '@chakra-ui/react'

interface Props {
  label: string
  children: React.ReactNode
}

function Tooltip({ label, children }: Props) {
  return (
    <CTooltip label={label} openDelay={500}>
      {children}
    </CTooltip>
  )
}

export default Tooltip
