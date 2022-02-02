import { FunctionComponent } from 'react'

import { formatDistanceToNow, format, parseISO, subYears } from 'date-fns'

interface Props {
  distance?: boolean
  dateString: string
}

const DateFormatter: FunctionComponent<Props> = ({
  distance = true,
  dateString,
}) => {
  const date = parseISO(dateString)
  const isOverYear = date < subYears(new Date(), 1)
  const formatted =
    distance && !isOverYear
      ? formatDistanceToNow(date, { addSuffix: true })
      : format(date, 'LLLL	dd, yyyy')

  return <time dateTime={dateString}>{formatted}</time>
}

export default DateFormatter
