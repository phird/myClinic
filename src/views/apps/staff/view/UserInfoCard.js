// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Alert, Card, CardBody, Button, Badge, CardHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Calendar } from 'react-feather'
import { useForm } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import { Icon } from '@iconify/react';

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store 
import { updateStaff } from '../store'


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

//* dateFormat imports
import dateFormat from 'dateformat'

// * Modal Imports 
import EditStaffModal from './Modal/Modal'



const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const genderColors = {
  ชาย: 'light-primary',
  หญิง: 'light-info'
}
// ** for converting date into thai date
const option = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedStaff }) => {
  // ** State
  const [modalOpen, setModalOpen] = useState(false)

  // ** toggle Modal
  const toggleModal = () => setModalOpen(!modalOpen)
  const dob = new Date(selectedStaff.dob);
  const birthday = dob.toLocaleDateString('th-TH', option);
  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: selectedStaff.username,
      lastName: selectedStaff.fname,
      firstName: selectedStaff.lname
    }
  })

  // ** render user img
  const renderUserImg = () => {
    const fullname = selectedStaff.fname + ' ' + selectedStaff.lname
    return (
      <Avatar
        initials
        color={'light-primary'}
        className='rounded mt-3 mb-2'
        content={fullname}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(48px)',
          width: '100%',
          height: '100%'
        }}
        style={{
          height: '110px',
          width: '110px'
        }}
      />
    )
  }

  const handleWithDob = (dob) => {
    const today = new Date();
    const staffDob = dateFormat(dob, 'yyyy');
    const age = today.getFullYear() - staffDob
    return age
  }

  const formatPhoneNo = (phoneNo) => {
    const firstPart = phoneNo.slice(0, 3);
    const secondPart = phoneNo.slice(3);
    return `${firstPart}-${secondPart}`
  }


  return (
    <Fragment>
      <Card>
        {selectedStaff.username == null || selectedStaff.pstatus == 0 ?
          <CardHeader>
            <Alert color='warning'>
              <h4 className='alert-heading'>คำเตือน</h4>
              <div className='alert-body'>ยังไม่ได้กำหนด ชื่อผู้ใช้ และ รหัสผ่าน สำหรับการเข้าสู่ระบบของบุคลากรท่านนี้</div>
            </Alert>
          </CardHeader>
          : <div></div>}
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <h2>{selectedStaff.fname + ' ' + selectedStaff.lname}</h2>
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedStaff !== null ? selectedStaff.fullName : 'Eleanor Aguilar'}</h4>
                  {selectedStaff !== null ? (
                    <Badge color={roleColors[selectedStaff.role]} className='text-capitalize'>
                      {selectedStaff.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color={genderColors[selectedStaff.gender]}
                className='rounded p-75'>
                <Icon className='font-medium-5' icon="mdi:gender-female" />
              </Badge>
              <div className='ms-75'>
                <span>เพศ</span>
                <h4 className='mb-0'>{selectedStaff.gender}</h4>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Calendar className='font-medium-4' />
              </Badge>
              <div className='ms-75'>
                <span>อายุ</span>
                <h4 className='mb-0'>{handleWithDob(selectedStaff.dob)} ปี</h4>
              </div>
            </div>
          </div>

          <h4 className='fw-bolder border-bottom pb-50 mb-1'>ข้อมูลส่วนตัว</h4>
          <div className='info-container'>
            {selectedStaff !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ชื่อผู้ใช้: </span>
                  <span>{selectedStaff.username}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>เลขบัตรประชาชน: </span>
                  <span>{selectedStaff.personalID}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ชื่อ: </span>
                  <span>{selectedStaff.fname + ' ' + selectedStaff.lname}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>อายุ: </span>
                  <span>{handleWithDob(selectedStaff.dob)} ปี</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>วันเกิด: </span>
                  <span>{birthday}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>หมู่เลือด: </span>
                  <span>{selectedStaff.bloodtype}</span>
                </li>
                <br />
                <li className='mb-75'>
                  <h5 className='fw-bolder me-25 border-bottom pb-50 mb-1'>ข้อมูลติดต่อ: </h5>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>เบอร์โทรติดต่อ: </span>
                  <span>{formatPhoneNo(selectedStaff.phoneNo)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ที่อยู่: </span>
                  <span>{selectedStaff.address +
                    ' ตำบล ' + selectedStaff.subdistrict +
                    ' อำเภอ ' + selectedStaff.district +
                    ' จังหวัด ' + selectedStaff.province +
                    ' ' + selectedStaff.postalCode
                  }</span>

                </li>

              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={toggleModal}>
              แก้ไขข้อมูล
            </Button>
          </div>
        </CardBody>
      </Card>
      <EditStaffModal selectedStaff={selectedStaff} open={modalOpen} toggleModal={toggleModal} />
    </Fragment>
  )
}

export default UserInfoCard
