import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"

const Layout = ({ 
  children
 }: {
  children: React.ReactNode
 }) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
