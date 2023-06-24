import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ column: 'email', table: 'users' }),
    ]),
    roleId: schema.number([rules.exists({ table: 'roles', column: 'id' })]),
  })

  public messages: CustomMessages = {
    required: 'Campo obrigatório',
    email: 'Formato inválido',
    unique: 'E-mail em uso',
    exists: 'Valor inválido',
  }
}
