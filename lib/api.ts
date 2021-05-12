import fs from 'fs';
import { join } from 'path';
import globby from 'globby';
import matter, { GrayMatterFile } from 'gray-matter';
import readingTime from 'reading-time';
import remark from 'remark';
import strip from 'strip-markdown';
import { BlogPost } from '../types/blog';

const postsDirectory = join(process.cwd(), 'content');

const defaultAuthor = {
  name: 'Mitchell Simoens',
  picture: '/assets/blog/authors/Mitchell Simoens.png',
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

const parseExcerpt = (file: GrayMatterFile<string>, _options: any): void => {
  let excerpt =
    (
      remark()
        .use(strip)
        .processSync(file.content)
        .toString()
    )
    .split('\n')
    .filter((line: string) => Boolean(line.trim()))
    .slice(0, 2)
    .join(' ');

  if (excerpt.length > 140) {
    excerpt = excerpt.substr(0, 140);
  }

  if (excerpt.length < file.content.length) {
    if (excerpt.substr(-1) === '.') {
      // in case the excerpt ends with a period
      // remove it so that the triple dot doesn't
      // lead to quad dots and look odd
      excerpt = excerpt.substr(0, excerpt.length - 1);
    }

    excerpt = `${excerpt.trim()}...`;
  }

  file.excerpt = excerpt.trim();
};

const getTimeToRead = (content: string): string => readingTime(content).text;

const parseContentsToPost = (fileContents: string, slug: string | string[]): BlogPost => {
  const { content, data, excerpt } = matter(fileContents, { excerpt: parseExcerpt as any });
  const timeToRead = getTimeToRead(content);
  const parsedSlug = Array.isArray(slug) ? slug.join('/') : slug;

  const items: BlogPost = {
    author: data.author ? data.author : { ...defaultAuthor },
    content: content,
    coverImage: data.coverImage || null, // cannot be undefined
    date: data.date,
    excerpt,
    slug: parsedSlug,
    timeToRead,
    title: data.title,
  };

  return items;
};

export function getPostBySlug(slug: string | string[]): BlogPost {
  const normalizedSlug = Array.isArray(slug) ? slug.join('/') : slug;
  const realSlug = normalizedSlug.replace(/\.md$/, '');
  let fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    fullPath = join(postsDirectory, `${realSlug}/index.md`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return parseContentsToPost(fileContents, realSlug);
}

export function getAllPosts(): BlogPost[] {
  return globby
    .sync([`${postsDirectory}/**/*.md`])
    .map((fullPath: string) => {
      const relativePath = fullPath.replace(postsDirectory, '');
      const realSlug = relativePath.replace(/(?:\/index)?\.md$/, '');
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      return parseContentsToPost(fileContents, realSlug);
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
