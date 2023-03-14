// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Insight = lazy(() => import('../../views/apps/insight'))
const Appointment = lazy(() => import('../../views/apps/calendar'))
const Encounter = lazy(()=> import('../../views/apps/encounter/list'))
const EncounterView = lazy(()=> import('../../views/apps/encounter/view'))
const UploadList = lazy(()=> import('../../views/apps/encounter/view/upload'))
const Patient = lazy(()=> import('../../views/apps/patients/list'))
const PatientView = lazy(()=> import('../../views/apps/patients/view'))
const Users = lazy(()=> import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))
const Services = lazy(()=> import('../../views/apps/services/list'))
const Drugs = lazy(()=> import('../../views/apps/drugs/list'))
const Setting = lazy(()=> import('../../views/apps/setting'))

// * Invoice
const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

// * Permisson
const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'))



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
    element: <EncounterView />,
    path: '/apps/encounter/view/:id'
  },
  {
    element: <UploadList />,
    path: '/apps/encounter/view/:id/upload'
  },
  {
    element: <Patient />,
    path: '/apps/patient'
  },
  {
    element: <PatientView />,
    path: '/apps/patient/view/:id'
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



  /* INvoice section */
  {
    element: <InvoiceList />,
    path: '/apps/invoice/list'
  },
  {
    element: <InvoicePreview />,
    path: '/apps/invoice/preview/:id'
  },
  {
    element: <InvoiceEdit />,
    path: '/apps/invoice/edit/:id'
  },
  {
    path: '/apps/invoice/print/:id',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank'
    }
  },

  /* role & permission */
  {
    element: <Roles />,
    path: '/apps/roles'
  },
  {
    element: <Permissions />,
    path: '/apps/permissions'
  }
]

export default AppRoutes
