'use client'

import DashboardLayout from '@/components/templates/layout'

type Props = {
    children: React.ReactNode
}
const Layout = ({ children }: Props) => {
    return <DashboardLayout>{children}</DashboardLayout>
}

export default Layout
