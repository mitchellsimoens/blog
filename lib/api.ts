import fs from 'fs';
import { join } from 'path';
import globby from 'globby';
import matter from 'gray-matter';
import { BlogPost } from '../types/blog';

const postsDirectory = join(process.cwd(), 'content');

const defaultAuthor = {
  name: 'Mitchell Simoens',
  picture: '/assets/blog/authors/Mitchell Simoens.png',
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

const parseContentsToPost = (fileContents: string, slug: string | string[]): BlogPost => {
  const { data, content } = matter(fileContents);

  const items: BlogPost = {
    author: data.author ? data.author : { ...defaultAuthor },
    content: content,
    coverImage: data.coverImage || null, // cannot be undefined
    date: data.date,
    slug: slug,
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
