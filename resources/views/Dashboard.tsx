import { useHttpContext } from '@ioc:Microeinhundert/Radonis'
import { useTwind } from '@microeinhundert/radonis-twind'
import React from 'react'

export default function Dashboard() {
  const { tx } = useTwind()
  const { auth } = useHttpContext()

  return (
    <>
      <h1 className={tx`font-bold text-4xl text-center my-8`}>
        Welcome to Daedalus, {auth.user!.name}
      </h1>
    </>
  )
}
