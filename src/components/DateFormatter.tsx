import { FunctionComponent } from 'react'

import { parseISO, format } from 'date-fns'

interface Props {
  dateString: string
}

const DateFormatter: FunctionComponent<Props> = ({ dateString }) => {
  const date = parseISO(dateString)

  return <time dateTime={dateString}>{format(date, 'LLLL	dd, yyyy')}</time>
}

export default DateFormatter
