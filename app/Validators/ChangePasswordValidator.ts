import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    currentPassword: schema.string(),
    newPassword: schema.string({}, [rules.minLength(8)]),
  })

  public messages: CustomMessages = {
    required: 'Campo obrigatório',
    minLength: 'Mínimo de 8 caracteres',
  }
}
