import fs from 'fs'
import path from 'path'

import mimes from 'mime/lite'
import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import { visit } from 'unist-util-visit'

const codeBlockFeatureRe = /(```\w+)(.*)$/gm
const relativeUrlRe = /^\.{1,2}\//

const markdownToHtml = async (markdown: string, markdownPath: string) => {
  const markdownDir = path.dirname(markdownPath)
  const parsed = markdown.replace(
    codeBlockFeatureRe,
    (_match: string, p1: string, p2: string) => {
      switch (p1) {
        case '```sh':
          // shell we won't get line numbers so let's not give it the default
          return p1

        default:
          return `${p1}${
            p2 || '[class="line-numbers"][class="diff-highlight"]'
          }`
      }
    },
  )
  const result = await remark()
    .use(() => (tree: any, _file: any, done: any): void => {
      let count = 0

      const parseImage =
        (node: any, url: string) =>
        (error: any, data: string): void => {
          if (error) {
            count = Infinity

            return done(error)
          }

          const mime = mimes.getType(path.extname(url))

          if (mime) {
            // eslint-disable-next-line no-param-reassign
            node.url = `data:${mime};base64,${data}`
          }

          count -= 1

          if (count === 0) {
            return done()
          }

          return undefined
        }

      const visitor = (node: any) => {
        const { url } = node

        if (url && relativeUrlRe.test(url)) {
          count += 1

          fs.readFile(
            path.resolve(markdownDir, url),
            'base64',
            parseImage(node, url),
          )
        }
      }

      visit(tree, 'image', visitor)

      if (!count) {
        done()
      }
    })
    // @ts-ignore
    .use(html, { sanitize: false })
    // @ts-ignore
    .use(prism, {
      transformInlineCode: true,
      plugins: [
        'autolinker',
        'command-line',
        'data-uri-highlight',
        'diff-highlight',
        'inline-color',
        'line-numbers',
        'treeview',
      ],
    })
    .process(parsed)

  return result.toString()
}

export default markdownToHtml
