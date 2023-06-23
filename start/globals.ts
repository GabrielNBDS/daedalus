import View from '@ioc:Adonis/Core/View'
import Roles from 'App/Enums/Roles'
import Role from 'App/Models/Role'
import getPaginationRange from 'App/Utils/getPaginationRange'
import clsx from 'clsx'

View.global('Roles', Roles)

View.global('getRolesSelectValues', async () => {
  return (await Role.query().orderBy('name', 'asc')).map((role) => ({
    value: role.id,
    label: role.name,
  }))
})

View.global('clsx', (...args: unknown[]) => {
  return clsx.apply(null, args)
})

View.global('getPaginationRange', getPaginationRange)
