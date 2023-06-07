import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const minify = require('html-minifier').minify
export default class HtmlMinifier {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // BEFORE NEXT: altering, authorizing, preparing request

    await next()

    // AFTER NEXT: altering response
    const method = request.method()
    const accepts = request.accepts([]) ?? ([] as string[])
    const isXml = request.url().endsWith('.xml')
    // if not GET request or doesn't expect HTML or is XML, then exit
    // since await next() already ran, we're safe to just return here to exit
    if (method !== 'GET' || !accepts.includes('text/html') || isXml) {
      return
    }
    // get the minified HTML of our current response body
    const minifiedBody = minify(response.getBody(), {
      minifyCss: true,
      minifyJs: true,
      removeComments: true,
      collapseWhitespace: true,
    })
    // set minfied HTML as new response body
    response.send(minifiedBody)
  }
}
