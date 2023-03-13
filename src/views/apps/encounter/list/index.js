// ** User List Component
import Table from './Table'

// ** Styles
import '@styles/react/apps/app-users.scss'


import Breadcrumbs from '@components/breadcrumbs'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='จัดการการตรวจผู้ป่วย' data={[{ title: 'บริการ' }, { title: 'จัดการการตรวจผู้ป่วย' }]} />
      <Table/>
    </div>
  )
}

export default UsersList
