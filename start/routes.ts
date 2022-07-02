import Route from '@ioc:Adonis/Core/Route'
import Dashboard from '../resources/views/Dashboard'
import Home from '../resources/views/Home'

Route.get('/', async ({ radonis }) => {
  return radonis.render(Home)
})

Route.get('/dashboard', async ({ radonis }) => {
  return radonis.render(Dashboard)
}).middleware('auth')

Route.get('/auth/github/redirect', 'AuthController.redirect')
Route.get('/auth/github/callback', 'AuthController.callback')
