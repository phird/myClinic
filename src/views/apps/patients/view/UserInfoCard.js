// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Check, Briefcase, X, User, Loader, Smile} from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

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

const UserInfoCard = ({ selectedPatient }) => {
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
      patientID: selectedPatient.patientID,
      lastName: selectedPatient.lname,
      firstName: selectedPatient.fname 
    }
  })

  // ** render user img
  const renderUserImg = () => {
    const fullName = selectedPatient.fname +' '+ selectedPatient.lname
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
      firstname: selectedPatient.fname,
      lastName: selectedPatient.lname
    })
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'แน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถเรียกคืนรายชื่อผู้ป่วยได้อีก!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ตกลง, ลบผู้ป่วย!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'เสร็จสิ้น!',
          text: 'ผู้ป่วยถูกลบจากระบบ.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'ยกเลิก',
          text: 'ยกเลิกการลบผู้ป่วย :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedPatient !== null ? selectedPatient.fname + " " +selectedPatient.lname : 'Eleanor Aguilar'}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <User className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{ selectedPatient.age }</h4>
                <small>อายุ</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Smile className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedPatient.gender}</h4>
                <small>เพศ</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>รายละเอียดผู้ป่วย</h4>
          <div className='info-container'>
            {selectedPatient !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>เพศ:</span>
                  <span> {selectedPatient.gender}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>วัน/เดือน/ปี เกิด:</span>
                  <span className='text-capitalize' >
                    {selectedPatient.dob}
                    
                  </span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>อายุ:</span>
                  <span className='text-capitalize'> 28 ปี </span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>กรุ๊ปเลือด:</span>
                  <span> {selectedPatient.bloodtype} </span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ข้อมูลติดต่อ:</span>
                  <span>{selectedPatient.phoneNo}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ที่อยู่:</span>
                  <span>
                    {selectedPatient.address + ', ' +
                     selectedPatient.district + ', '+ 
                     selectedPatient.subdistrict + ', '+
                     selectedPatient.province + ', '+
                     selectedPatient.postalcode}
                    </span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              แก้ไขข้อมูลผู้ป่วย
            </Button>
{/*             <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Suspended
            </Button> */}
          </div>
        </CardBody>
      </Card>


      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>แก้ไขข้อมูลผู้ป่วย</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  ชื่อจริง
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='John' invalid={errors.firstname && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  นามสกุล
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastname && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  เพศ
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  defaultValue={selectedPatient.gender}
                  placeholder= 'Male / Female'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  วันเดือนปีเกิด:
                </Label>
                <Input
                  id='tax-id'
                  placeholder='DD/MM/YYYY'
                  defaultValue={selectedPatient.dob}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  กรุ๊ปเลือด
                </Label>
                <Input
                  id='tax-id'
                  placeholder='O,A,B,AB'
                  defaultValue={selectedPatient.bloodtype}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                  ข้อมูลติดต่อ
                </Label>
                <Input id='contact' 
                defaultValue={selectedPatient.phoneNo} 
                placeholder='(+66) 87 545 1234' />
              </Col>
              <Col md={12} xs={12}>
                <Label className='form-label' for='language'>
                  ที่อยู่
                </Label>
                <Input
                  id='tax-id'
                  placeholder='บ้่านเลขที่ xx หมู่ xx'
                  defaultValue={selectedPatient.address}
                />
              </Col>
             
              <Col xs={12}>
                <div className='d-flex align-items-center mt-1'>
                  <div className='form-switch'>
                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    <Label className='form-check-label' htmlFor='billing-switch'>
                      <span className='switch-icon-left'>
                        <Check size={14} />
                      </span>
                      <span className='switch-icon-right'>
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className='form-check-label fw-bolder' for='billing-switch'>
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
