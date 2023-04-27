import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Get, Middleware, Post } from '@ioc:SoftwareCitadel/Girouette'
import CreatePasswordValidator from 'App/Validators/CreatePasswordValidator'
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

  @Get('/criar-senha', 'create-password')
  @Middleware('auth')
  public async createPasswordView({ view }: HttpContextContract) {
    return view.render('pages/create-password')
  }

  @Post('/create-password', 'create-password.store')
  @Middleware('auth')
  public async createPassword({ auth, request, response }: HttpContextContract) {
    const user = auth.user!

    const { newPassword } = await request.validate(CreatePasswordValidator)

    user.password = newPassword
    user.isVerified = true

    await user.save()

    return response.redirect().toRoute('dashboard')
  }
}
