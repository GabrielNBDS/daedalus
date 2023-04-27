import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Roles from 'App/Enums/Roles'
import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public isVerified: boolean

  @column()
  public name: string

  @column()
  @slugify({
    strategy: 'shortId',
    fields: ['name'],
    allowUpdates: true,
  })
  public slug: string

  @column()
  public email: string

  @attachment({ preComputeUrl: true, disk: 's3' })
  public avatar: AttachmentContract | null

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @computed()
  public get isAdmin() {
    return this.roleId === Roles.ADMIN
  }

  @column()
  public roleId: number

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
