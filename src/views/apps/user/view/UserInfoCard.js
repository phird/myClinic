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

const UserInfoCard = ({ selectedUser }) => {
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
      username: selectedUser.username,
      lastName: selectedUser.fullName.split(' ')[1],
      firstName: selectedUser.fullName.split(' ')[0]
    }
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.avatar}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser.fullName}
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
      username: selectedUser.username,
      lastName: selectedUser.fullName.split(' ')[1],
      firstName: selectedUser.fullName.split(' ')[0]
    })
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: '?????????????????????????????????????',
      text: "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '????????????, ???????????????????????????!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: '???????????????????????????!',
          text: '?????????????????????????????????????????????????????????.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: '??????????????????',
          text: '?????????????????????????????????????????????????????? :)',
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
                  <h4>{selectedUser !== null ? selectedUser.fullName : 'Eleanor Aguilar'}</h4>
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
                <h4 className='mb-0'>28 ??????</h4>
                <small>????????????</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Smile className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>????????????</h4>
                <small>?????????</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>???????????????????????????????????????????????????</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>?????????:</span>
                  <span> ???????????? {/* {selectedUser.email} */}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>?????????/???????????????/?????? ????????????:</span>
                  <span className='text-capitalize' >
                    1 ?????????????????? 2538
                    {/* {selectedUser.status} */}
                  </span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>????????????:</span>
                  <span className='text-capitalize'> 28 ?????? {/* {selectedUser.role} */}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>??????????????????????????????:</span>
                  <span> O {/* Tax-{selectedUser.contact.substr(selectedUser.contact.length - 4)} */}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>????????????????????????????????????:</span>
                  <span>{selectedUser.contact}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>?????????????????????:</span>
                  <span>
                    58/7 New Phetburi Bang Kapi Huai Khwang
                    City:   Bangkok
                    State/province/area:    Bangkok
                    Zip code  10310
                    </span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              ??????????????????????????????????????????????????????
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
            <h1 className='mb-1'>??????????????????????????????????????????????????????</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  ????????????????????????
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  ?????????????????????
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  ?????????
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  defaultValue={selectedUser.email}
                  placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  ??????????????????????????????????????????:
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Tax-1234'
                  defaultValue={selectedUser.contact.substr(selectedUser.contact.length - 4)}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  ??????????????????????????????
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Tax-1234'
                  defaultValue={selectedUser.contact.substr(selectedUser.contact.length - 4)}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                  ????????????????????????????????????
                </Label>
                <Input id='contact' defaultValue={selectedUser.contact} placeholder='+1 609 933 4422' />
              </Col>
              <Col md={12} xs={12}>
                <Label className='form-label' for='language'>
                  ?????????????????????
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Tax-1234'
                  defaultValue={selectedUser.contact.substr(selectedUser.contact.length - 4)}
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
