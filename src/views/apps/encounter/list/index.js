// ** User List Component
import Table from './Table'

// ** Styles
import '@styles/react/apps/app-users.scss'


import Breadcrumbs from '@components/breadcrumbs'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='จัดการการรักษา' data={[{ title: 'บริการ' }, { title: 'การรักษา' }]} />
      <Table />
    </div>
  )
}

export default UsersList
