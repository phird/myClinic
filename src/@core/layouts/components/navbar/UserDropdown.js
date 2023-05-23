// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '../../../../assets/images/avatars/avatar-blank.png'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState({})


  //** ComponentDidMount
  useEffect(() => {
    const fetchData = async() => {
      const isLoggedIn = await isUserLoggedIn()
    
      if (isLoggedIn !== false) {
        const cookies = document.cookie;
        let userData = {};
        if (cookies) {
          const cookiePairs = cookies.split("; ");
          for (let i = 0; i < cookiePairs.length; i++) {
            const cookiePair = cookiePairs[i].split('=');
            const cookieName = decodeURIComponent(cookiePair[0]);
            const cookieValue = decodeURIComponent(cookiePair[1]);
            if (cookieName === 'accessToken') {
              // Decode the access token to extract the user data
              const decodedToken = jwtDecode(cookieValue);
              userData = decodedToken ? decodedToken : {};
              break;
            }
          }
        }
        //console.log("before if there a userData ", userData)
        if (userData) {
          Promise.all([
            setUserData(userData),
          ]).catch(error => {
            console.log("Error updating state:", error);
          });
        }
      }
    };
    fetchData();
  }, []);



  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData['name']) || ' - '}</span>
          <span className='user-status'>{(userData && userData.roleID === 1 ? 'ผู้ดูแล' : 'ทั่วไป') || 'Admin'}</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to={`/apps/staff/view/${userData.staffID}`}>
          <User size={14} className='me-75' />
          <span className='align-middle'>โปรไฟล์</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to={`/apps/staff/view/${userData.staffID}`}>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>ตั้งค่า</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>ลงชื่อออกจากระบบ</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
