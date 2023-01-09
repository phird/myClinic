import { lazy } from 'react'

const Homepage = lazy(() => import('../../views/dashboard/home'))

const DashboardRoutes = [
  {
    element: <Homepage />,
    path: '/home'
  },
]
export default DashboardRoutes
