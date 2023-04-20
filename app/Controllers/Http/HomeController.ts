import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Get, Middleware } from '@ioc:SoftwareCitadel/Girouette'

export default class HomeController {
  @Get('/', 'home.index')
  public async home({ view }: HttpContextContract) {
    return view.render('pages/home')
  }

  @Get('/dashboard', 'dashboard')
  @Middleware('auth')
  public async index({ view }: HttpContextContract) {
    return view.render('pages/dashboard')
  }
}
