// ** User List Component
import Table from './Table'
// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-calendar.scss'


import Breadcrumbs from '@components/breadcrumbs'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='การนัดหมาย' data={[{ title: 'บริการ' }, { title: 'การนัดหมาย' }]} />
      <Table />
    </div>
  )
}

export default UsersList
