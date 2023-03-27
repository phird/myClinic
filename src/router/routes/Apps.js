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
const Services = lazy(()=> import('../../views/apps/services/list'))
const Drugs = lazy(()=> import('../../views/apps/drugs/list'))
const Staff = lazy(()=> import('../../views/apps/staff/list'))
const StaffView = lazy(()=> import('../../views/apps/staff/view'))
const Setting = lazy(()=> import('../../views/apps/setting'))

// * Invoice
const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))


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
    element: <Services />,
    path: 'apps/services'
  },
  {
    element: <Drugs />,
    path: 'apps/drugs'
  },
  {
    element: <Staff />,
    path: 'apps/staff'
  },
  {
    element: <StaffView />,
    path: 'apps/staff/view/:id'
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

]

export default AppRoutes
