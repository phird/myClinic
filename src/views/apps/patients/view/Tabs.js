// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User,Image } from 'react-feather'

// ** User Components
import PatientSumList from './patientSumList'
import UploadImageList from './uploadedImage'
const UserTabs = ({ selectedPatient, active, toggleTab }) => {
  const patient = selectedPatient;
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>รายละเอียดผู้ป่วย</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Image className='font-medium-3 me-50' />
            <span className='fw-bold'>รูปภาพที่อัปโหลด</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <PatientSumList selectedPatient={patient} />
        </TabPane>
        <TabPane tabId='2'>
          <UploadImageList selectedPatient={selectedPatient}/>
        </TabPane>

      </TabContent>
    </Fragment>
  )
}
export default UserTabs
