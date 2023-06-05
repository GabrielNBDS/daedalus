import 'unpoly'
import 'unpoly/unpoly.css'

up.fragment.config.runScripts = true

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])

up.on('up:layer:dismissed', (event) => {
  if (event?.origin?.baseURI) {
    up.render({ target: 'body', url: event.origin.baseURI, navigate: true })
  }
})

up.on('up:fragment:loaded', (event) => {
  let fullReload = event.response.getHeader('X-Full-Reload')

  if (fullReload) {
    // Prevent the fragment update and don't update browser history
    event.preventDefault()

    // Make a full page load for the same request.
    event.request.loadPage()
  }
})
