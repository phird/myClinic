// ** Icons Import
import { 
  PieChart,
  PenTool,
  MessageSquare, 
  CheckSquare, 
  Calendar,  
  UserCheck,
  Box,
  Settings,
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
    id: 'encounter',
    title: 'ตรวจผู้ป่วย',
    icon: <PenTool size={20} />,
    navLink: '/apps/encounter'
  },
  {
    id: 'patient',
    title: 'จัดการผู้ป่วย',
    icon: <UserCheck size={20} />,
    navLink: '/apps/users'
  },
  {
    id: 'services',
    title: 'จัดการการบริการ',
    icon: <CheckSquare size={20} />,
    navLink: '/apps/services'
  },
  {
    id: 'drugs',
    title: 'จัดการคลังยา',
    icon: <Box size={20} />,
    navLink: '/apps/drugs'
  },
  {
    id: 'setting',
    title: 'ตั้งค่า',
    icon: <Settings size={20} />,
    navLink: '/apps/setting'
  },

 
]
