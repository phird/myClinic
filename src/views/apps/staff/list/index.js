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

const StaffsList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='จัดการข้อมูลบุคลากร' data={[{ title: 'การตั้งค่า' }, { title: 'จัดการข้อมูลบุคลากร' }]} />
      <Table />
    </div>
  )
}

export default StaffsList
