import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async index(user: User) {
    return user.roleId === Roles.ADMIN
  }
  public async read(user: User) {
    return user.roleId === Roles.ADMIN
  }
  public async create(user: User) {
    return user.roleId === Roles.ADMIN
  }
  public async update(user: User) {
    return user.roleId === Roles.ADMIN
  }
  public async delete(user: User, userToBeDeleted: User) {
    return user.roleId === Roles.ADMIN && userToBeDeleted.id !== user.id
  }
}
