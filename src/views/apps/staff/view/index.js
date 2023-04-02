// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

// ** Store & Actions
import { getStaffData } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert, Button} from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
import UserStat from './UserStat'
// ** Styles
import { ChevronLeft } from 'react-feather'
import '@styles/react/apps/app-users.scss'

const StaffView = () => {
  // ** Store Vars
  const store = useSelector(state => state.staff)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getStaffData(parseInt(id)))

  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1)
  }


  return store.selectedStaff !== null && store.selectedStaff !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col>
          <div>
            <Button.Ripple
              className='btn-icon'
              color='flat-success'
              onClick={e => handleGoBack(e)}
            >
              <ChevronLeft size={24} />
              กลับ
            </Button.Ripple>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedStaff={store.selectedStaff} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserStat encounterData={store.encounterStaff}/>
          <UserTabs active={active} toggleTab={toggleTab} selectedStaff={store.selectedStaff} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>ไม่พบข้อมูลบุคลากร</h4>
      <div className='alert-body'>
        ไม่พบข้อมูลบุคลากรหมายเลข : {id}. กลับสู่หน้าจัดการข้อมูลบุตลากร: <Link to='/apps/staff'>จัดการข้อมูลบุคลากร</Link>
      </div>
    </Alert>
  )
}
export default StaffView
