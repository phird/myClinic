// ** React Imports
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, } from 'react-router-dom'

// ** Store & Actions
import {
  getPatient,
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

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getPatient(parseInt(id)))
  }, [dispatch])


  const [active, setActive] = useState('1')

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
    navigate("/apps/patient")
    dispatch(resetEncounterData())
  }

  console.log("this is store.selectedPatient")
  console.log(store.selectedPatient)


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
            <UserInfoCard selectedPatient={store.selectedPatient} />
          </Col>
          <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} />
          </Col>
        </Row>
      </div>
    ) :
    (
      <Alert color='danger'>
        <h4 className='alert-heading'>User not found</h4>
        <div className='alert-body'>
          Patient with id: {id} doesn't exist. Check list of all Patient: <Link to='/apps/patient'>Patient List</Link>
        </div>
      </Alert>
    )
}
export default UserView
