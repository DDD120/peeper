import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Props {
  date: Date
  type: 'distanceToNow' | 'date' | 'time-date'
}

export const formatDate = ({ date, type = 'date' }: Props) => {
  switch (type) {
    case 'distanceToNow': {
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
    case 'date': {
      return format(date, 'yyyy년 M월 d일', { locale: ko })
    }
    case 'time-date': {
      return format(date, 'a h:mm · yyyy년 M월 d일', { locale: ko })
    }
  }
}
