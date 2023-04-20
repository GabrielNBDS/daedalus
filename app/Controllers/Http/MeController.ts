import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Get, Middleware, Post } from '@ioc:SoftwareCitadel/Girouette'
import User from 'App/Models/User'
import ChangePasswordValidator from 'App/Validators/ChangePasswordValidator'
import UpdateAvatarValidator from 'App/Validators/UpdateAvatarValidator'
import UpdateMeValidator from 'App/Validators/UpdateMeValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class MeController {
  @Get('/dashboard/me', 'me')
  @Middleware('auth')
  public async index({ view }: HttpContextContract) {
    return view.render('pages/dashboard/me')
  }

  @Get('/dashboard/me/editar', 'me.edit')
  @Middleware('auth')
  public async edit({ view }: HttpContextContract) {
    return view.render('pages/dashboard/me/edit')
  }

  @Post('/dashboard/me/update', 'me.update')
  @Middleware('auth')
  public async update({ auth, session, request, response }: HttpContextContract) {
    const user = auth.user!

    const { name, email } = await request.validate(UpdateMeValidator)

    const alreadyExists = await User.findBy('email', email)

    if (alreadyExists && user.email !== email) {
      session.flash({
        name,
        email,
        errors: { email: ['E-mail em uso'] },
      })

      return response.redirect().back()
    }

    user.name = name
    user.email = email

    await user.save()

    return response.redirect().toRoute('me')
  }

  @Post('/dashboard/me/update-avatar', 'me.update-avatar')
  @Middleware('auth')
  public async updateAvatar({ auth, request, response }: HttpContextContract) {
    const { avatar } = await request.validate(UpdateAvatarValidator)

    const user = auth.user!

    user.avatar = Attachment.fromFile(avatar)

    await user.save()

    return response.redirect().toRoute('me.edit')
  }

  @Post('/dashboard/me/remove-avatar', 'me.remove-avatar')
  @Middleware('auth')
  public async removeAvatar({ auth, response }: HttpContextContract) {
    const user = auth.user!

    user.avatar = null

    await user.save()

    return response.redirect().toRoute('me.edit')
  }

  @Get('/dashboard/me/trocar-senha', 'me.change-password-view')
  @Middleware('auth')
  public async changePasswordView({ view }: HttpContextContract) {
    return view.render('pages/dashboard/me/change-password')
  }

  @Post('/dashboard/me/change-password', 'me.change-password')
  @Middleware('auth')
  public async changePassword({ auth, session, request, response }: HttpContextContract) {
    const user = auth.user!

    const { currentPassword, newPassword } = await request.validate(ChangePasswordValidator)

    if (!(await Hash.verify(user.password, currentPassword))) {
      session.flash({
        currentPassword,
        newPassword,
        errors: { currentPassword: ['Senha incorreta'] },
      })

      return response.redirect().back()
    }

    user.password = newPassword

    await user.save()

    return response.redirect().toRoute('me')
  }
}
