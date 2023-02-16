// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
  ButtonGroup,
  Container,
} from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'



// ** User Components
import InvoiceList from './InvoiceList'
import DoctorBoxs from './doctorBoxs'


const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>


      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-start align-items-center" >
            <div class="d-flex">
              <h3> รายละเอียดทางการแพทย์ </h3>
            </div>
          </Col>
          <Col className="d-flex justify-content-end align-items-center" >
            <div className="d-flex justify-content-end align-items-center">
              <Button.Ripple color='success' className="d-flex mx-2 justify-content-center">
                อัพโหลด
              </Button.Ripple>
              <Button.Ripple color='danger' outline className="d-flex justify-content-center">
                เสร็จสิ้นการตรวจ
              </Button.Ripple>
            </div>
          </Col>
        </Row>
      </Container>

      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Account</span>
          </NavLink>
        </NavItem>

      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <DoctorBoxs  />
          <InvoiceList />
          <InvoiceList />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
