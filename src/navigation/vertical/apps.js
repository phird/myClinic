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
    header: 'บริการ',
    action: 'read',
    resource: 'ACL',
  },
  {
    id: 'insight',
    title: 'ข้อมูลเชิงลึก',
    icon: <PieChart size={20} />,
    navLink: '/apps/insight',
    action: 'read',
    resource: 'ACL',
    
  },
  {
    id: 'appointment',
    title: 'การนัดหมาย',
    icon: <Calendar size={20} />,
    navLink: '/apps/appointment',
    action: 'read',
    resource: 'ACL',
  },
  {
    id: 'patient',
    title: 'จัดการผู้ป่วย',
    icon: <UserCheck size={20} />,
    navLink: '/apps/patient',
    action: 'read',
    resource: 'ACL',
  },
  {
    id: 'encounter',
    title: 'ตรวจผู้ป่วย',
    icon: <PenTool size={20} />,
    navLink: '/apps/encounter',
    action: 'read',
    resource: 'ACL',
  },
  {
    id: 'invoices',
    title: 'จัดการค่ารักษา',
    icon: <Paperclip size={20} />,
    navLink: '/apps/invoice/list',
    action: 'read',
    resource: 'ACL',
  },

 
]
