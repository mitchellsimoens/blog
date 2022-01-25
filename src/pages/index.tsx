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
      <span role="img" aria-label="heart">
        ❤️
      </span>{' '}
      to them for what they have provided to devs like me.
    </p>

    <p>
      Right now, this site really just a blog. In the future, I will have more
      around. Hope you check it out from time to time!
    </p>

    <h2 className="text-lg font-semibold">Site TODO:</h2>

    <ul>
      <li>
        <span role="img" aria-label="fire">
          🔥
        </span>{' '}
        Dark mode (because I am a dark moder)
      </li>
      <li>
        <span role="img" aria-label="nail_care">
          💅
        </span>{' '}
        Mobile
      </li>
      <li>
        <span role="img" aria-label="robot">
          🤖
        </span>{' '}
        Tests!
      </li>
    </ul>
  </Main>
)

export default Index
