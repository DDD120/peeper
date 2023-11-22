import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

export const formatDate = (date: Date) => {
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
}
