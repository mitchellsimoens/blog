export interface Author {
  name: string;
  picture: string;
}

export interface OGImage {
  url: string;
}

export interface BlogPost {
  author: Author;
  content: string;
  coverImage: string;
  date: string;
  ogImage?: OGImage;
  slug?: string;
  title: string;
}
