import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Get, Middleware, Post } from '@ioc:SoftwareCitadel/Girouette'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  @Get('/dashboard/usuarios', 'users.index')
  @Middleware('auth')
  public async index({ view, request }: HttpContextContract) {
    const perPage = 10
    const page = request.input('page', 1)

    const users = (
      await User.query().orderBy('name', 'asc').preload('role').paginate(page, perPage)
    ).baseUrl('/dashboard/usuarios')

    return view.render('pages/dashboard/users', { users })
  }

  @Get('/dashboard/usuarios/criar', 'users.create')
  @Middleware('auth')
  public async create({ view }: HttpContextContract) {
    return view.render('pages/dashboard/users/create')
  }

  @Get('/dashboard/usuarios/:slug', 'users.read')
  @Middleware('auth')
  public async read({ view, request }: HttpContextContract) {
    const slug = request.param('slug')

    const user = await User.findByOrFail('slug', slug)

    await user.load('role')

    return view.render('pages/dashboard/users/read', { user })
  }

  @Get('/dashboard/usuarios/:slug/editar', 'users.edit')
  @Middleware('auth')
  public async edit({ auth, view, request, response }: HttpContextContract) {
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
  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const data = await request.validate(UpdateUserValidator)

    const user = await User.findOrFail(id)

    user.merge(data)
    await user.save()

    return response.redirect().toRoute('users.read', [user.slug])
  }

  @Post('/users', 'users.store')
  @Middleware('auth')
  public async store({ request, response }: HttpContextContract) {
    const { name, email } = await request.validate(CreateUserValidator)

    await User.create({ name, email, password: '123456' })

    return response.redirect().toRoute('users.index')
  }

  @Post('/users/:id/delete', 'users.delete')
  @Middleware('auth')
  public async delete({ auth, request, response }: HttpContextContract) {
    const currentUser = auth.user!
    const id = request.param('id') as string

    if (currentUser.id === Number(id)) {
      return response.redirect().back()
    }

    const user = await User.findOrFail(id)
    await user.delete()

    return response.redirect().toRoute('users.index')
  }
}
