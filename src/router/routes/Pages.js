import { lazy } from 'react'

const Error = lazy(() => import('../../views/pages/misc/Error'))
const AccountSettings = lazy(() => import('../../views/pages/account-settings'))

const PagesRoutes = [
  {
    path: '/pages/account-settings',
    element: <AccountSettings />
  },
  {
    path: '/misc/error',
    element: <Error />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  }
]

export default PagesRoutes
