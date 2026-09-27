import type { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return <main className="p-10">{children}</main>
}

export default Layout
