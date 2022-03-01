import fs from 'fs'
import { join } from 'path'

import { globbySync } from 'globby'
import matter, { GrayMatterFile } from 'gray-matter'
import readingTime from 'reading-time'
import { remark } from 'remark'
import strip from 'strip-markdown'

import { author as defaultAuthor } from '../content/authors/default'
import { BlogPost } from '../types/blog'

const postsDirectory = join(process.cwd(), 'content')

const EXCERPT_LENGTH = 140

export const getPostSlugs = () => fs.readdirSync(postsDirectory)

const parseExcerpt = (file: GrayMatterFile<string>, _options: any): void => {
  let excerpt = remark()
    .use(strip)
    .processSync(file.content)
    .toString()
    .split('\n')
    .filter((line: string) => Boolean(line.trim()))
    .slice(0, 2)
    .join(' ')

  if (excerpt.length > EXCERPT_LENGTH) {
    excerpt = excerpt.substr(0, EXCERPT_LENGTH)
  }

  if (excerpt.length < file.content.length) {
    if (excerpt.substr(-1) === '.') {
      // in case the excerpt ends with a period
      // remove it so that the triple dot doesn't
      // lead to quad dots and look odd
      excerpt = excerpt.substr(0, excerpt.length - 1)
    }

    if (excerpt.length >= EXCERPT_LENGTH) {
      // in case the excerpt was less than the
      // requested length of excerpt
      excerpt = `${excerpt.trim()}...`
    }
  }

  // eslint-disable-next-line no-param-reassign
  file.excerpt = excerpt.trim()
}

const getTimeToRead = (content: string): string => readingTime(content).text

const parseContentsToPost = (
  fileContents: string,
  slug: string | string[],
  fullPath: string,
): BlogPost => {
  const { content, data, excerpt } = matter(fileContents, {
    excerpt: parseExcerpt as any,
  })
  const timeToRead = getTimeToRead(content)
  const parsedSlug = Array.isArray(slug) ? slug.join('/') : slug

  const items: BlogPost = {
    author: data.author ? data.author : { ...defaultAuthor },
    content,
    coverImage: data.coverImage || null, // cannot be undefined
    date: data.date,
    file: fullPath,
    excerpt,
    slug: parsedSlug,
    tags: data.tags || null,
    timeToRead,
    title: data.title,
  }

  return items
}

export const getPostBySlug = (slug: string | string[]): BlogPost => {
  const normalizedSlug = Array.isArray(slug) ? slug.join('/') : slug
  const realSlug = normalizedSlug.replace(/\.mdx?$/, '')
  let fullPath = join(postsDirectory, `${realSlug}.md`)

  if (!fs.existsSync(fullPath)) {
    const testMdx = `${fullPath}x`

    if (fs.existsSync(testMdx)) {
      fullPath = testMdx
    }
  }

  if (!fs.existsSync(fullPath)) {
    fullPath = join(postsDirectory, `${realSlug}/index.md`)
  }

  if (!fs.existsSync(fullPath)) {
    const testMdx = `${fullPath}x`

    if (fs.existsSync(testMdx)) {
      fullPath = testMdx
    }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  return parseContentsToPost(fileContents, realSlug, fullPath)
}

export const getAllPosts = (): BlogPost[] => {
  return globbySync([`${postsDirectory}/**/*.(md|mdx)`])
    .map((fullPath: string) => {
      const relativePath = fullPath.replace(postsDirectory, '')
      const realSlug = relativePath.replace(/(?:\/index)?\.mdx?$/, '')
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      return parseContentsToPost(fileContents, realSlug, fullPath)
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export const getAllTags = (): string[] => {
  const posts = getAllPosts()

  const tags = posts.reduce((post_tags, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => post_tags.add(tag))
    }

    return post_tags
  }, new Set<string>())

  return Array.from(tags).filter(Boolean).sort()
}
