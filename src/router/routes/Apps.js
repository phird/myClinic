// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Insight = lazy(() => import('../../views/apps/insight'))
const Appointment = lazy(() => import('../../views/apps/calendar'))
const Encounter = lazy(()=> import('../../views/apps/encounter/list'))
const Users = lazy(()=> import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))
const Services = lazy(()=> import('../../views/apps/services/list'))
const Drugs = lazy(()=> import('../../views/apps/drugs/list'))
const Setting = lazy(()=> import('../../views/apps/setting'))


const AppRoutes = [
  {
    element: <Insight />,
    path: '/apps/insight',
  },
  {
    element: <Appointment />,
    path: '/apps/appointment'
  },
  {
    element: <Encounter />,
    path: '/apps/encounter'
  },
  {
    element: <Users />,
    path: '/apps/users'
  },
  {
    element: <UserView />,
    path: '/apps/user/view/:id'
  },
  {
    element: <Services />,
    path: 'apps/services'
  },
  {
    element: <Drugs />,
    path: 'apps/drugs'
  },
  {
    element: <Setting />,
    path: 'apps/setting'
  },
]

export default AppRoutes
