// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, } from 'react-feather'

// ** User Components
import PatientSumList from './patientSumList'
const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>รายละเอียดผู้ป่วย</span>
          </NavLink>
        </NavItem>

      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <PatientSumList />
        </TabPane>
        
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
