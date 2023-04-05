// ** Reactstrap Imports
import { Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormFeedback, Label, Input, InputGroup, InputGroupText } from 'reactstrap'
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
// ** Images
import trialSvg from '@src/assets/images/illustration/pricing-Illustration.svg'

//* Third-Party Components 
import * as yup from 'yup'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import Cleave from 'cleave.js/react'
import classnames from 'classnames'
import MapContainer from './MapContainer';


// ** Import Style 
import '@styles/react/libs/react-select/_react-select.scss'
import 'flatpickr/dist/themes/dark.css';
import '@styles/react/libs/flatpickr/flatpickr.scss'


// * Store & Actions 
const MySwal = withReactContent(Swal)
const defaultValues = {
  name: '',
  address: '',
  phoneNo: '',
  email: '',
  open: null,
  close: null,
  description: '',
}

const SignupClinic = yup.object().shape({
  name: yup.string().required(),
  phoneNo: yup.string().min(10).max(10).required(),
  open: yup.date().required(),
  close: yup.date().required(),
  description: yup.string().max(200).required(),
  address: yup.string().min(10).required(),
  email: yup.string().email()
})


const Clinic = () => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const toggleModal = () => setOpenModal(!openModal)
  const [des, setDes] = useState('')
  const [addr, setAddr] = useState('')

  // ** For map
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(SignupClinic) })

  const onSubmit = data => {
    console.log("Click")
    console.log(data)
    
  }

  const handleMapOpen = () => {
    setShowMap(true);
  };

  const handleLocationSelect = (location) => {
    setLocation(location);
    setShowMap(false);
  };

  return (
    <div className='pricing-free-trial'>
      <Row>
        <Col className='mx-auto' lg={{ size: 10, offset: 3 }} sm='12'>
          <div className='pricing-trial-content d-flex justify-content-between'>
            <div className='text-center text-md-start mt-3'>
              <h3 className='text-primary'>ดูเหมือนท่านยังยังไม่มีข้อมูลคลินิก!</h3>
              <h5>กด เพิ่มข้อมูลคลินิก เพื่อเพิ่มข้อมูลคลินิก 🏥 </h5>
              <div className='mt-2 mt-lg-3'>
                <Button onClick={toggleModal} color='primary'>เพิ่มข้อมูลคลินิก</Button>
              </div>
            </div>
            <img
              className='pricing-trial-img img-fluid'
              src={trialSvg}
              alt='trial svg'
              style={{
                transform: 'scaleX(1)'
              }}
            />
          </div>
        </Col>
      </Row>

      {/* Modal */}
      <Modal isOpen={openModal} className='modal-dialog-centered modal-lg' backdrop='static' >
        <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'> 🏥 เพิ่มข้อมูลคลินิก  </h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className='gy-1 pt-75'>
                <Col>
                  <div className='mb-1'>
                    <Label className='form-label' for='Name'>
                      ชื่อคลินิก
                    </Label>
                    <Controller
                      id='name'
                      name='name'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} placeholder='ชื่อคลินิก' invalid={errors.name && true} />}
                    />
                    {errors.name && <FormFeedback>{'กรุณากรอกชื่อคลินิก'}</FormFeedback>}
                  </div>
                </Col>
                <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                  <Col>
                    <div className='mb-1'>
                      <Label className='form-label' for='open'>
                        เวลาเปิดทำการ
                      </Label>
                      <Controller
                        control={control}
                        id='open'
                        name='open'
                        render={({ field }) => (
                          <Flatpickr
                            {...field}
                            options={{
                              enableTime: true,
                              noCalendar: true,
                              dateFormat: 'H:i',
                              time_24hr: true,
                              utc: '+07:00'
                            }}
                            className={classnames('form-control', {
                              'is-invalid': errors.open && true
                            })}
                          />
                        )}
                      />
                      {errors.open && <FormFeedback>{'กรุณาเลือกเวลาเปิดบริการ'}</FormFeedback>}
                    </div>
                  </Col>
                  <Col>
                    <div className='mb-1'>
                      <Label className='form-label' for='close'>
                        เวลาปิดทำการ
                      </Label>
                      <Controller
                        control={control}
                        id='close'
                        name='close'
                        render={({ field }) => (
                          <Flatpickr
                            {...field}
                            options={{
                              enableTime: true,
                              noCalendar: true,
                              dateFormat: 'H:i',
                              time_24hr: true,
                              utc: '+07:00'
                            }}
                            className={classnames('form-control', {
                              'is-invalid': errors.close && true
                            })}
                          />
                        )}
                      />
                      {errors.close && <FormFeedback>{'กรุณาเลือกเวลาปิดบริการ'}</FormFeedback>}
                    </div>
                  </Col>
                </Row>
                <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                  <div>
                    <Row>
                      <Col>
                        <div className='form-floating mb-0'>
                          <Input
                            value={des}
                            name='des'
                            type='textarea'
                            id='des'
                            placeholder='คำอธิบายคลินิก'
                            style={{ minHeight: '100px' }}
                            onChange={e => setDes(e.target.value)}
                            className={classnames({ 'text-danger': des.length > 200 })}

                          />
                          <Label className='form-label' for='textarea-counter'>
                            คำอธิบายคลินิก
                          </Label>
                        </div>
                        <span
                          className={classnames('textarea-counter-value float-end', {
                            'bg-danger': des.length > 200
                          })}
                        >
                          {`${des.length}/200`}
                        </span>
                      </Col>
                      <Col>
                        <div className='mb-1'>
                          <Label className='form-label' for='phone-number'>
                            เบอร์โทรติดต่อ
                          </Label>
                          <InputGroup className='input-group-merge'>
                            <InputGroupText
                              className={classnames({
                                'is-invalid': errors.phoneNo && true
                              })}
                            >
                              TH (+66)
                            </InputGroupText>
                            <Controller
                              id='phoneNo'
                              name='phoneNo'
                              control={control}
                              placeholder='0 81 2345678'
                              render={({ field }) => (
                                <Cleave
                                  {...field}
                                  className={classnames('form-control', {
                                    'is-invalid': errors.phoneNo && true
                                  })}
                                  options={{ phone: true, phoneRegionCode: 'TH' }}
                                />
                              )}
                            />
                            {errors.phoneNo && <FormFeedback>{'กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก'}</FormFeedback>}
                          </InputGroup>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Row>

                <div className='divider'>
                  <div className='divider-text'>ข้อมูลที่อยู่</div>
                </div>
                <Row md={12} xs={12}>
                  <Col className="d-flex justify-content-center aling-items-center">
                    <Input 
                    value={addr}
                    name='addr'
                    type='textarea'
                    id='addr'
                    placeholder='ที่อยู่'
                    style={{ minHeight: '100px' }}
                    onChange={e => setAddr(e.target.value)}
                    invalid={errors.address && !addr}
                     />
                    {/* <div >
                      <Button color="primary" onClick={toggle}>เลือกบนแผนที่</Button>
                      <Modal isOpen={modal} toggle={toggle} className='modal-dialog-centered modal-lg' centered>
                        
                        <ModalBody className='px-sm-5 pt-50 pb-5'>
                          <MapContainer onMarkerClick={toggle} />
                        </ModalBody>
                      </Modal>
                    </div>

                    {location && (
                      <div>
                        <p>Latitude: {location.lat}</p>
                        <p>Longitude: {location.lng}</p>
                      </div>
                    )} */}


                  </Col>

                </Row>
                <Row md={12} xs={12}>
                  <Col xs={12} className='text-center mt-2 pt-50'>
                    <Button
                      type='submit'
                      className='me-1'
                      color='primary'
                      onClick={(e) => {e.preventDefault()}}
                    >
                      เพิ่มข้อมูลคลินิก
                    </Button>
                  </Col>

                </Row>

              </Row>
            </Form>
          </div>

        </ModalBody>
      </Modal>
    </div>
  )
}

export default Clinic
