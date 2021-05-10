import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

const codeBlockFeatureRe = /(```\w+)(.*)$/gm;

const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(html)
    .use(prism)
    .process(markdown.replace(codeBlockFeatureRe, (_match: string, p1: string, p2: string) =>
      `${p1}${p2 || '[class="line-numbers"][class="diff-highlight"]'}`
    ));

  return result.toString();
};

export default markdownToHtml;
