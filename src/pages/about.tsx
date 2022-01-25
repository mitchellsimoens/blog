import Link from '@/components/Link'
import { Meta } from '@/layout/Meta'
import { Main } from '@/templates/Main'

const About = () => (
  <Main
    meta={
      <Meta title="Mitchell Simoens" description="About Mitchell Simoens" />
    }
  >
    <p>
      I am really a nerd of many things at heart. I started coding in the 90s
      and continue to love coding to this day with no end in sight. While the
      amount of time I get to code has drastically reduced, it will always be
      something I look forward to. My first real coding language was{' '}
      <Link href="https://en.wikipedia.org/wiki/BASIC">BASIC</Link>. My first
      language that I used in a non-personal project was{' '}
      <Link href="https://en.wikipedia.org/wiki/Perl">Perl</Link>. My favorite
      language right now is{' '}
      <Link href="https://en.wikipedia.org/wiki/TypeScript">TypeScript</Link>.
    </p>
    <p>
      One passion of mine has been mentoring others. Whether it has been through
      a forum or in person, I just really love it. I love it because people have
      mentored me and it is my way of paying it forward. When I see someone
      struggle, I find it exciting to jump in and help them through whatever
      problem they are stuck on. This can be work related or I also find myself
      helping in personal matters more often than I thought I would be.
    </p>
    <p>
      I think this is why I really love my current job. I am currently a
      Director of Engineering for{' '}
      <Link href="https://moduscreate.com/">Modus Create</Link>. In this job, I
      get to do a wide range of things. I get some time to code but as I lead
      teams for our clients, I get to mentor other people around me. Those
      people may be devs, they may be QA, they may be SMs or BAs. They are all
      sorts of different people in different roles.
    </p>
    <p>
      One thing I really love working at a remote-first company is the ability
      to work with people from around the world. While being remote does have
      challenges, I find the reward so much more enjoyable. Working with people
      from different backgrounds makes my job better. It makes me a better
      person. For example, I may see something in one light but other people see
      that same thing in a different light. I love getting exposed to those
      different lights.
    </p>
    <p>
      As you can tell, I really love where my life is. If you want to join me,{' '}
      <Link href="mailto:hi@mitch.io">reach out</Link>! Modus Create is{' '}
      <Link href="https://moduscreate.com/careers/">hiring</Link>!
    </p>
  </Main>
)

export default About
