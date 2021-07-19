import { FunctionComponent } from 'react'
import Link from './Link'

interface Props {
  firstPageUri?: string
  page: number
  total: number
  uriPrefix?: string
}

const Pager: FunctionComponent<Props> = ({
  firstPageUri,
  page,
  total,
  uriPrefix,
}) => {
  let newerHref = page === 1 ? null : `${uriPrefix || '/page/'}${page - 1}`

  if (page === 2 && firstPageUri) {
    newerHref = firstPageUri
  }

  return (
    <div className="flex">
      {newerHref ? <Link href={newerHref}>← Newer Posts</Link> : null}

      <div className="flex-1" />

      {page === total ? null : (
        <Link href={`${uriPrefix || '/page/'}${page + 1}`}>Older Posts →</Link>
      )}
    </div>
  )
}

export default Pager
