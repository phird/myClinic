// ** React Imports
import { Fragment } from 'react'
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link, Shield } from 'react-feather'

// ** User Components

import SecurityTab from './SecurityTab'
import RolePermission from './Role'
import SetUsername from './Username'
import UserEncounterList from './UserEncounterList'

const UserTabs = ({ active, toggleTab, selectedStaff }) => {


  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>ทั่วไป</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>ตั้งค่าความปลอดภัย & บทบาท</span>
          </NavLink>
        </NavItem>

      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserEncounterList />
        </TabPane>
        <TabPane tabId='2'>
          <SetUsername staffID={selectedStaff.staffID} staffUsername={selectedStaff.username} />
          <SecurityTab staffRole={selectedStaff.roleID} staffID={selectedStaff.staffID} selectedStaff={selectedStaff.newStaff} />
          <RolePermission staffID={selectedStaff.staffID} staffRole={selectedStaff.roleID} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
