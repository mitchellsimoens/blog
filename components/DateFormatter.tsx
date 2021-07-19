import { parseISO, format } from 'date-fns'
import { FunctionComponent } from 'react'

interface Props {
  dateString: string
}

const DateFormatter: FunctionComponent<Props> = ({ dateString }) => {
  const date = parseISO(dateString)

  return <time dateTime={dateString}>{format(date, 'LLLL	dd, yyyy')}</time>
}

export default DateFormatter
