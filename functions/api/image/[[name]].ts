interface Options {
  cf: {
    image: {
      fit?: string | null
      height?: string | null
      quality?: string | null
      width?: string | null
    }
  }
}

type EnvVars = {}

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

    const options: Options & RequestInit = {
      cf: {
        image: {},
      },
    }

    if (url.searchParams.has('fit')) {
      options.cf.image.fit = url.searchParams.get('fit')
    }

    if (url.searchParams.has('width')) {
      options.cf.image.width = url.searchParams.get('width')
    }

    if (url.searchParams.has('height')) {
      options.cf.image.height = url.searchParams.get('height')
    }

    if (url.searchParams.has('quality')) {
      options.cf.image.quality = url.searchParams.get('quality')
    }

    const imageRequest = new Request(url.href, {
      headers: request.headers,
    })

    return await fetch(imageRequest, options)
  } catch (e: any) {
    return new Response(e.message)
  }
}
