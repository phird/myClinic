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
import Prescription from './Prescription'
import DoctorBoxs from './DoctorBoxes'
import Invoice from './Invoice'






const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Card>
        <CardBody>
          <Container className='my-2' fluid>
            <Row>
              <Col className="d-flex justify-content-start align-items-center" >
                <div className="d-flex">
                  <h3>รายละเอียดทางการตรวจ</h3>
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
          <div>
            <DoctorBoxs />
            <Prescription />
            <Invoice />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}
export default UserTabs
