import { useTwind } from '@microeinhundert/radonis-twind'
import React from 'react'

export default function Home() {
  const { tx } = useTwind()

  return (
    <>
      <h1 className={tx`font-bold text-4xl text-center my-8`}>Welcome to Daedalus</h1>
    </>
  )
}
