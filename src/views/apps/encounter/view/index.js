// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate,} from 'react-router-dom'

// ** Store & Actions
import { getEncounter, getDisease} from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert, Button } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

// ** Styles
import { ChevronLeft } from 'react-feather'
import '@styles/react/apps/app-users.scss'


const UserView = () => {
  // ** Store Vars
  const store = useSelector(state => state.encounters)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getEncounter(parseInt(id)))
    dispatch(getDisease())
  }, [dispatch])

  const navigate = useNavigate()
  // ** Handles Label Update
  const handleGoBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return store.selectedEncounter !== null && store.selectedEncounter !== undefined ? (
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
        <Col xl='3' lg='5' xs={{ order: 0 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedEncounter={store.selectedEncounter} />
        </Col>
        <Col xl='9' lg='7' xs={{ order: 1 }} md={{ order: 1, size: 7 }}>
          <UserTabs selectedEncounter={store.selectedEncounter} suggestDisease={store.suggestDisease} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>ไม่เจอบันทึกการตรวจ</h4>
      
    </Alert>
  )
}
export default UserView
