// ** Icons Import
import { 
  PieChart,
  PenTool,
  CheckSquare, 
  Calendar,  
  UserCheck,
  Box,
  Paperclip
} from 'react-feather'

export default [
  {
    header: 'บริการ'
  },
  {
    id: 'insight',
    title: 'ข้อมูลเชิงลึก',
    icon: <PieChart size={20} />,
    navLink: '/apps/insight'
  },
  {
    id: 'appointment',
    title: 'การนัดหมาย',
    icon: <Calendar size={20} />,
    navLink: '/apps/appointment'
  },
  {
    id: 'patient',
    title: 'จัดการผู้ป่วย',
    icon: <UserCheck size={20} />,
    navLink: '/apps/patient'
  },
  {
    id: 'encounter',
    title: 'ตรวจผู้ป่วย',
    icon: <PenTool size={20} />,
    navLink: '/apps/encounter'
  },
  {
    id: 'invoices',
    title: 'จัดการค่ารักษา',
    icon: <Paperclip size={20} />,
    navLink: '/apps/invoice/list'
  },

 
]
