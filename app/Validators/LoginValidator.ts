import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }),
    password: schema.string({ trim: true }),
    rememberMe: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    required: 'Campo obrigatório',
  }
}
