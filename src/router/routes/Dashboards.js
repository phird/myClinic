import { lazy } from 'react'

const Homepage = lazy(() => import('../../views/dashboard/home'))

const DashboardRoutes = [
  {
    element: <Homepage />,
    path: '/home',
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
]
export default DashboardRoutes
