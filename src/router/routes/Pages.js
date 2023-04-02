import { lazy } from 'react'

const Error = lazy(() => import('../../views/pages/misc/Error'))
const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
const AccessControl = lazy(() => import('../../views/extensions/access-control'))

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
  },  
  {
    path: '/access-control',
    element: <AccessControl />,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
]

export default PagesRoutes
