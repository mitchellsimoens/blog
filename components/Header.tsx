import { FunctionComponent } from 'react'
import Link from './Link'

const Header: FunctionComponent = () => (
  <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
    <Link href="/">Home</Link>
  </h2>
)

export default Header
