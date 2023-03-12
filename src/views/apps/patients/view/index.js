// ** React Imports
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, } from 'react-router-dom'

// ** Store & Actions
import {
  getPatient,
  getPatientEncounter,
  resetEncounterData,
} from '../store'
import { useSelector, useDispatch } from 'react-redux'



// ** Reactstrap Imports
import { Row, Col, Alert, Button } from 'reactstrap'
import { ChevronLeft } from 'react-feather'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
// ** Styles
import '@styles/react/apps/app-users.scss'

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
    dispatch(getPatientEncounter(parseInt(id)))
  }, [dispatch])

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const navigate = useNavigate()
  // ** Handles Label Update
  const handleGoBack = (e) => {
    e.preventDefault()
    console.log("im in handdleGoBack")
    dispatch(resetEncounterData())
    navigate("/apps/patient")
    
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

        <Row>
          <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard selectedPatient={store.selectedPatient} onC />
          </Col>
          <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} selectedPatient={store.selectedPatient} />
          </Col>
        </Row>
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
