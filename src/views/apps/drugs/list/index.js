// ** User List Component
import Table from './Table'
// ** Styles
import '@styles/react/apps/app-users.scss'

import Breadcrumbs from '@components/breadcrumbs'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='การจัดการยา' data={[{ title: 'การตั้งค่า' }, { title: 'จัดการข้อมูลยา' }]} />
      <Table />
    </div>
  )
}

export default UsersList
