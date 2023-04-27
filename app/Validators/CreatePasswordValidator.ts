import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({ newPassword: schema.string({}, [rules.minLength(8)]) })

  public messages: CustomMessages = {
    required: 'Campo obrigatório',
    minLength: 'Mínimo de 8 caracteres',
  }
}
