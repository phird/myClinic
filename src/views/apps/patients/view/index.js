// ** React Imports
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, } from 'react-router-dom'

// ** Store & Actions
import {
  getPatient,
} from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { getPatientEncounter, getWidgetEncounter } from '../../encounter/store'


// ** Reactstrap Imports
import { Row, Col, Alert, Button } from 'reactstrap'
import { ChevronLeft } from 'react-feather'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
import StatUserCard from './StatUser'
// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/pages/page-profile.scss'

const UserView = props => {
  // ** Store Vars

  const store = useSelector(state => state.patients)
  const dispatch = useDispatch()
  const [active, setActive] = useState('1')

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getPatient(parseInt(id)))
  }, [dispatch, id])


  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const navigate = useNavigate()
  // ** Handles Label Update
  const handleGoBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return store.selectedPatient !== null && store.selectedPatient !== undefined ?
    (
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
        <Col>

          <Row >
            <Col xl='8' lg='8' xs={{ order: 1 }} md={{ order: 1, size: 12 }}>
              <UserInfoCard selectedPatient={store.selectedPatient} onC />
            </Col>
            <Col xl='4' lg='4' xs={{ order: 2 }} md={{ order: 2, size: 12}}>
              <StatUserCard selectedPatient={store.selectedPatient} onC />
            </Col>
          </Row>

          <Col xl='12' lg='12' xs={{ order: 0 }} md={{ order: 0, size: 12 }}>
            <UserTabs active={active} toggleTab={toggleTab} selectedPatient={store.selectedPatient} />
          </Col>
        </Col>
      </div>
    ) :
    (
      <Alert color='danger'>
        <h4 className='alert-heading'>ไม่พบผู้ป่วย</h4>
        <div className='alert-body'>
          ไม่พบผู้ป่วยรหัส {id}. ดูรายชื่อผู้ป่วยทั้งหมดได้ที่นี่: <Link to='/apps/patient'>รายชื่อผู้ป่วย</Link>
        </div>
      </Alert>
    )
}
export default UserView
