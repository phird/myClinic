// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'


import Breadcrumbs from '@components/breadcrumbs'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='จัดการการตรวจผู้ป่วย' data={[{ title: 'การตั้งค่า' }, { title: 'จัดการข้อมูลบุคลากร' }]} />
      <Table />
    </div>
  )
}

export default UsersList
