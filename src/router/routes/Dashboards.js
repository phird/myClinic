import { lazy } from 'react'

const Homepage = lazy(() => import('../../views/dashboard/home'))

const DashboardRoutes = [
  {
    path: '/home',
    element: <Homepage />,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
]
export default DashboardRoutes
