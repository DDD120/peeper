import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Props {
  date: Date
  type?: 'distanceToNow' | 'normal'
}

export const formatDate = ({ date, type = 'normal' }: Props) => {
  if (type === 'distanceToNow') {
    const diff = (Date.now() - date.getTime()) / 1000
    if (diff < 60) {
      return '방금 전'
    }
    if (diff < 60 * 60 * 24 * 7) {
      return formatDistanceToNow(date, {
        addSuffix: true,
        locale: ko,
      })
    }

    return format(date, 'yy년 MM월 dd일', { locale: ko })
  } else {
    return format(date, 'a h:mm · yyyy년 M월 d일', { locale: ko })
  }
}
