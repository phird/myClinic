// ** React Imports
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, } from 'react-router-dom'

// ** Store & Actions
import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert, Button } from 'reactstrap'
import { ChevronLeft } from 'react-feather'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
// ** Styles
import '@styles/react/apps/app-users.scss'



const UserView = () => {
  // ** Store Vars
  const store = useSelector(state => state.users)
  const dispatch = useDispatch()

  // ** Hooks
  const { patientID } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUser(parseInt(patientID)))
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  const navigate = useNavigate()
  const goback = () => {
    navigate(-1)
  }

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className='app-user-view'>

      <Row>
        <Col>      
            <div>
              <Button.Ripple 
              className='btn-icon' 
              color='flat-success'
              onClick={goback}
               >           
                <ChevronLeft size={24} />
            </Button.Ripple>
            </div>
        </Col>
      </Row>

      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={store.selectedUser} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {patientID} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}
export default UserView
