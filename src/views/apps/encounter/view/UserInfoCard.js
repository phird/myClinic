// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardBody, Badge } from 'reactstrap'


// ** Third Party Components
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

//* dateFormat imports
import dateFormat from 'dateformat'


const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  1: 'light-danger',
  0: 'light-success'
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'dutch', label: 'Dutch' }
]

const MySwal = withReactContent(Swal)



const UserInfoCard = ({ selectedEncounter }) => {
  // ** State
  const [show, setShow] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: selectedEncounter.username,
    }
  })

  // ** render user img
  const renderUserImg = () => {
    const fullName = selectedEncounter.fname + ' ' + selectedEncounter.lname
    return (
      <Avatar
        initials
        color={'light-primary'}
        className='rounded mt-3 mb-2'
        content={fullName}
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

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      username: selectedEncounter.username,
    })
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Suspend user!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Suspended!',
          text: 'User has been suspended.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Cancelled Suspension :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  const ageCal = () => {
    const today = new Date()
    const dob = dateFormat(selectedEncounter.dob, "yyyy")
    console.log(dob)
    const age = today.getFullYear() - dob
    return age
  }

  const statusHandler = () => {
    const es = selectedEncounter.eStatus
    if (es === 1) {
      return "ยังใช้งาน"
    } else {
      return "ตรวจเสร็จแล้ว"
    }
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <h4 className='fw-bolder border-bottom pb-50 mb-1'>รายละเอียดผู้ป่วย</h4>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedEncounter !== null ? selectedEncounter.fullName : 'Eleanor Aguilar'}</h4>
                  {selectedEncounter !== null ? (
                    <Badge color={roleColors[selectedEncounter.role]} className='text-capitalize'>
                      {selectedEncounter.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='info=container'>
            <ul className='list-unstyled'>
              <li className='mb-75'>
                <span className='fw-bolder me-25'>ชื่อผู้ป่วย:</span>
                <span>  {selectedEncounter.fname} {selectedEncounter.lname} </span>
              </li>
              <li className='mb-75'>
                <span className='fw-bolder me-25'>รหัสผู้ป่วย:</span>
                <span> PT - {selectedEncounter.patientID}</span>
              </li>
              <li className='mb-75'>
                <span className='fw-bolder me-25'>อายุ:</span>
                <span> {ageCal()} ปี</span>
              </li>
              <li className='mb-75'>
                <span className='fw-bolder me-25'>วันที่ทำการตรวจ:</span>
                <span className='text-capitalize'>   {dateFormat(selectedEncounter.addedDate, "dd/mm/yyyy")}</span>
              </li>
              <li className='mb-75'>
                <Badge className='text-capitalize' color={statusColors[selectedEncounter.eStatus]}>
                  {statusHandler()}
                </Badge>
              </li>
            </ul>

          </div>

          {/* ======divider======= */}
          <h4 className='fw-bolder border-bottom pb-50 mb-1'></h4>
          {/* =============== */}


          <div className='info-container'>
            {selectedEncounter !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>แพทย์ที่ทำการตรวจ:</span>
                  <span>  DoctorID:{selectedEncounter.staffID}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>รายละเอียด:</span>
                  <span>{!selectedEncounter.note? '   -   ' : selectedEncounter.note }</span>
                </li>
              </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
