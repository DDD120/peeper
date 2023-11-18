import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

export const formatDate = (date: Date) => {
  const diff = (Date.now() - date.getTime()) / 1000
  if (diff < 60) {
    return '방금 전'
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ko,
    })
  } else {
    return format(date, 'PPP EEE p', { locale: ko })
  }
}
