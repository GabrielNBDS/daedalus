import { useTwind } from '@microeinhundert/radonis-twind'
import React from 'react'

export default function Home() {
  const { tx } = useTwind()

  return (
    <div className={tx`text-center my-8`}>
      <h1 className={tx`font-bold text-4xl mb-4`}>Welcome to Daedalus</h1>

      <a href="/auth/github/redirect">Login with github</a>
    </div>
  )
}
