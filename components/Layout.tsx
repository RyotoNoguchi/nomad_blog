import React from 'react'
import { Header } from './'

type Props = {
  children: React.ReactNode
}

const Layout: React.VFC<Props> = ({
  children
}) => {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}

export default Layout
