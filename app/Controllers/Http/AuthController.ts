import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Get, Post } from '@ioc:SoftwareCitadel/Girouette'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  @Get('/login', 'login')
  public async index({ auth, response, view }: HttpContextContract) {
    if (auth.isAuthenticated) {
      return response.redirect().toRoute('dashboard')
    }
    return view.render('pages/login')
  }

  @Post('/login', 'login.post')
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password, rememberMe } = await request.validate(LoginValidator)

    await auth.use('web').attempt(email, password, rememberMe)
    response.redirect('/dashboard')
  }

  @Get('/logout', 'logout')
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect().toRoute('login')
  }
}
