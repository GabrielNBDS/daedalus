import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Get, Middleware, Post } from '@ioc:SoftwareCitadel/Girouette'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  @Get('/dashboard/usuarios', 'users.index')
  @Middleware('auth')
  public async index({ view, request, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('index')

    const perPage = 10
    const page = request.input('page', 1)

    const users = (
      await User.query().orderBy('name', 'asc').preload('role').paginate(page, perPage)
    ).baseUrl('/dashboard/usuarios')

    return view.render('pages/dashboard/users', { users })
  }

  @Get('/dashboard/usuarios/criar', 'users.create')
  @Middleware('auth')
  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')
    return view.render('pages/dashboard/users/create')
  }

  @Post('/users', 'users.store')
  @Middleware('auth')
  public async store({ bouncer, request, response }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')

    const { name, email } = await request.validate(CreateUserValidator)

    await User.create({ name, email, password: '123456' })

    return response.redirect().toRoute('users.index')
  }

  @Get('/dashboard/usuarios/:slug', 'users.read')
  @Middleware('auth')
  public async read({ view, request, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('read')

    const slug = request.param('slug')

    const user = await User.findByOrFail('slug', slug)

    await user.load('role')

    return view.render('pages/dashboard/users/read', { user })
  }

  @Get('/dashboard/usuarios/:slug/editar', 'users.edit')
  @Middleware('auth')
  public async edit({ auth, bouncer, view, request, response }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const loggedUser = auth.user!

    const slug = request.param('slug')

    if (loggedUser.slug === slug) {
      return response.redirect().toRoute('me')
    }

    const user = await User.findBy('slug', slug)

    if (!user) {
      return response.notFound()
    }

    await user.load('role')

    return view.render('pages/dashboard/users/edit', { user })
  }

  @Post('/users/:id/update', 'users.update')
  @Middleware('auth')
  public async update({ bouncer, session, request, response }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const id = request.param('id')

    const { name, email, roleId } = await request.validate(UpdateUserValidator)

    const user = await User.findOrFail(id)

    const alreadyExistEmail = await User.findBy('email', email)
    if (alreadyExistEmail && user.email !== email) {
      session.flash({
        name,
        email,
        errors: { email: ['E-mail em uso'] },
      })

      return response.redirect().back()
    }
    user.merge({ name, email, roleId })
    await user.save()

    return response.redirect().toRoute('users.read', [user.slug])
  }

  @Post('/users/:id/delete', 'users.delete')
  @Middleware('auth')
  public async delete({ bouncer, request, response }: HttpContextContract) {
    const id = request.param('id') as string

    const user = await User.findOrFail(id)

    await bouncer.with('UserPolicy').authorize('delete', user)

    await user.delete()

    return response.redirect().toRoute('users.index')
  }
}
