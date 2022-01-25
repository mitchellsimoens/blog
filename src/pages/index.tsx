import Link from '@/components/Link'
import { siteDescription, siteTitle } from '@/constants'
import { Meta } from '@/layout/Meta'
import { Main } from '@/templates/Main'

const Index = () => (
  <Main meta={<Meta title={siteTitle} description={siteDescription} />}>
    <p>
      This site contains thoughts and some experimental things aimed at teaching
      myself and maybe others. Things may break from time to time as I play,
      this site has always been an arena that I can continue to push my skills.
      For example, I wanted to learn{' '}
      <Link href="https://nextjs.org/">Next.js</Link>,{' '}
      <Link href="https://tailwindcss.com/">Tailwind CSS</Link> and{' '}
      <Link href="https://www.cloudflare.com/">Cloudflare</Link> more... so I
      built it. I will be honest, I love it. It feels like the DX of many of the
      tools I am using is exciting me more to keep pushing myself. Much{' '}
      <span role="img" aria-label="rocket">
        ❤️
      </span>{' '}
      to them for what they have provided to devs like me.
    </p>

    <p>
      Right now, this site really just a blog. In the future, I will have more
      around. Hope you check it out from time to time!
    </p>
  </Main>
)

export default Index
