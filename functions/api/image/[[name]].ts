type EnvVars = {}

const hasAndValid = (
  searchParams: URLSearchParams,
  name: string,
  options: RequestInitCfPropertiesImage,
  isNumber = false,
) => {
  if (searchParams.has(name)) {
    const value = searchParams.get(name)

    if (value && options) {
      const parsed = isNumber ? parseInt(value, 10) : value
      const obj = options as any

      obj[name] = parsed
    }
  }
}

export async function onRequest({
  request,
  params,
}: EventContext<EnvVars, string, void>) {
  try {
    let { name } = params

    if (name) {
      if (Array.isArray(name)) {
        name = name.join('/')
      }

      name = name.trim()

      if (name[0] !== '/') {
        name = `/${name}`
      }
    } else {
      return new Response('Image not found', { status: 404 })
    }

    const url = new URL(request.url)

    url.pathname = name

    const options: CfRequestInit = {
      cf: {
        image: {},
      },
    }
    const imageOptions = options?.cf?.image as RequestInitCfPropertiesImage

    hasAndValid(url.searchParams, 'fit', imageOptions)
    hasAndValid(url.searchParams, 'height', imageOptions, true)
    hasAndValid(url.searchParams, 'quality', imageOptions, true)
    hasAndValid(url.searchParams, 'width', imageOptions, true)

    const accept = request.headers.get('Accept')
    if (accept) {
      if (/image\/avif/.test(accept)) {
        imageOptions.format = 'avif'
      } else if (/image\/webp/.test(accept)) {
        imageOptions.format = 'webp'
      }
    }

    const imageRequest = new Request(url.href, {
      headers: request.headers,
    })

    return await fetch(imageRequest, options)
  } catch (e: any) {
    return new Response(e.message)
  }
}
