const { writeFile } = require('fs/promises')
const globby = require('globby')
const { dirname } = require('path')

;(async () => {
  const files = await globby('content/**/*')
  const parsed = files
    .map((file) => {
      const parsedFile = file.replace('content', '')
      const dest = dirname(parsedFile)
      const from = dest.replace('/post', '')
      const [, year] = from.split('/')

      // 2021 is the year moving to cloudflare pages
      // so we don't need to create redirects for blogs
      // after. This keeps us under 100 redirects which
      // is the limit
      if (parseInt(year) < 2021) {
        return {
          from,
          dest,
        }
      }

      return null
    })
    .filter(Boolean)
  // remove duplicates that can happen from multiple
  // blogs in a day or if a blog has other files in
  // the same dir
  const unique = parsed.reduce((filter, current) => {
    var match = filter.find((item) => item.from === current.from)

    if (match) {
      // console.log(match);
      return filter
    }

    return filter.concat([current])
  }, [])

  const formatted = unique
    .map(({ from, dest }) => `${from} ${dest} 301`)
    .join('\n')

  await writeFile(`./_redirects`, formatted)
})()
