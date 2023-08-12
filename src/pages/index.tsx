import { Link } from '@nextui-org/react'
import NextLink from 'next/link'

import { siteDescription, siteTitle } from '@/constants'
import { Meta } from '@/layout/Meta'
import { Main } from '@/templates/Main'

const Index = () => (
  <Main meta={<Meta title={siteTitle} description={siteDescription} />}>
    <article>
      <p>
        This site contains thoughts and some experimental things aimed at
        teaching myself and maybe others. Things may break from time to time as
        I play, this site has always been an arena that I can continue to push
        my skills. For example, I wanted to learn{' '}
        <Link href="https://nextjs.org/" as={NextLink}>
          Next.js
        </Link>
        ,{' '}
        <Link href="https://tailwindcss.com/" as={NextLink}>
          Tailwind CSS
        </Link>
        ,{' '}
        <Link href="https://nextui.org/" as={NextLink}>
          NextUI
        </Link>{' '}
        and{' '}
        <Link href="https://www.cloudflare.com/" as={NextLink}>
          Cloudflare
        </Link>{' '}
        more... so I built it. I will be honest, I love it. It feels like the DX
        of many of the tools I am using is exciting me more to keep pushing
        myself. Much{' '}
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
        <li className="line-through">
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          Dark mode (because I am a dark moder)
        </li>
        <li>
          <span className="line-through">
            <span role="img" aria-label="phone">
              📱
            </span>{' '}
            Mobile
          </span>{' '}
          At least a start...
        </li>
        <li>
          <span role="img" aria-label="nail_care">
            💅
          </span>{' '}
          An actual blog design, this is just too plain
        </li>
        <li>
          <span role="img" aria-label="robot">
            🤖
          </span>{' '}
          Tests!
        </li>
      </ul>
    </article>
  </Main>
)

export default Index
