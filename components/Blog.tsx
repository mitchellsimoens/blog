import { useRouter } from 'next/router'

const Blog = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Blog: {pid}</p>
}

export default Blog
