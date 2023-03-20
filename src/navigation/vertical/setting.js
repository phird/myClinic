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
  Shield,
  Circle,
  User
} from 'react-feather'

export default [
  {
    header: 'การตั้งค่า'
  },
  {
    id: 'services',
    title: 'จัดการข้อมูลการบริการ',
    icon: <CheckSquare size={20} />,
    navLink: '/apps/services'
  },
  {
    id: 'drugs',
    title: 'จัดการข้อมูลยา',
    icon: <Box size={20} />,
    navLink: '/apps/drugs'
  },
  {
    id: 'staff',
    title: 'จัดการข้อมูลบุคลากร',
    icon: <User size={20} />,
    navLink: '/apps/staff'
  },
  {
    id: 'setting',
    title: 'ตั้งค่า',
    icon: <Settings size={20} />,
    navLink: '/apps/setting'
  },



]