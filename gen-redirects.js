;(async () => {
  const { writeFile } = await import('fs/promises')
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { globbySync } = await import('globby')
  const { dirname } = await import('path')
  const files = globbySync('content/**/*')
  const parsed = files
    .map((file) => {
      const parsedFile = file.replace('content', '')
      const dest = dirname(parsedFile)
      const from = dest.replace('/blog', '')
      const [, year] = from.split('/')

      // 2021 is the year moving to cloudflare pages
      // so we don't need to create redirects for blogs
      // after. This keeps us under 100 redirects which
      // is the limit
      if (parseInt(year, 10) < 2021) {
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
    const match = filter.find((item) => item.from === current.from)

    if (match) {
      return filter
    }

    return filter.concat([current])
  }, [])

  const formatted = unique
    .map(({ from, dest }) => `${from} ${dest} 301`)
    .join('\n')

  await writeFile(`./public/_redirects`, formatted)
})()
