import { useHttpContext } from '@ioc:Microeinhundert/Radonis'
import { useTwind } from '@microeinhundert/radonis-twind'
import React from 'react'

export default function Dashboard() {
  const { tx } = useTwind()
  const { auth } = useHttpContext()

  return (
    <div className={tx`text-center my-8`}>
      <h1 className={tx`font-bold text-4xl mb-4`}>Welcome to Daedalus, {auth.user!.name}</h1>

      <a href="/auth/logout">Logout</a>
    </div>
  )
}
