import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateAvatarValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    avatar: schema.file({
      size: '3mb',
      extnames: ['jpg', 'jpeg', 'png'],
    }),
  })

  public messages: CustomMessages = {
    'required': 'Campo obrigatório',
    'file.size': 'Tamanho máximo da imagem: 3MB',
    'file.extname': 'Formatos aceitos: PNG e JPG/JPEG',
  }
}
