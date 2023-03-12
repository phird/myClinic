// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader, Spinner } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Check, Briefcase, X, User, Loader, Smile } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import InputAddress from 'react-thailand-address-autocomplete'
import toast from 'react-hot-toast'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import 'flatpickr/dist/themes/dark.css';

// ** STORE
import { updatePatient } from '../store'


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

const MySwal = withReactContent(Swal)

// ** Utils
import { selectThemeColors } from '@utils'

const genderOptions = [
  { value: 'ชาย', label: 'ชาย' },
  { value: 'หญิง', label: 'หญิง' }
]
const bloodTypeOption = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" }
];

const UserInfoCard = ({ selectedPatient }) => {

  // * DATA OF SELECTED_PATIENT
  console.log(" *************** SELECTED PATIENT ************** ")
  console.log(selectedPatient)
  console.log(" *************** SELECTED PATIENT ************** ")
  // ** State
  const [show, setShow] = useState(false)
  // * Reserve for Edit data 
  const dispatch = useDispatch()
  // ** Current Date

  const currentDate = new Date().toISOString().slice(0, 10);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(selectedPatient.fname);
  const [lastName, setLastName] = useState(selectedPatient.lname); // Fname and Lname
  const [picker, setPicker] = useState(selectedPatient.dob); // DOB
  const [gender, setGender] = useState({ value: selectedPatient.gender, label: selectedPatient.gender }); // Gender
  const [bloodType, setBloofType] = useState({ value: selectedPatient.bloodtype, label: selectedPatient.bloodtype }); // Blood Type
  const [houseNo, setHouseNo] = useState(selectedPatient.address) //House No.
  const [address, setAddress] = useState({ district: selectedPatient.district, subdistrict: selectedPatient.subdistrict, province: selectedPatient.province, zipcode: selectedPatient.postalCode });
  const [telNo, setTelNo] = useState(selectedPatient.phoneNo); // Phone NO. 
  const [perID, setPerID] = useState(selectedPatient.personalID);

  const option = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const regist = new Date(selectedPatient.addedDate);
  const registDate = regist.toLocaleDateString('th-TH', option);

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = selectedPatient.patientID
    const fname = firstName;
    const lname = lastName;
    const phoneNo = telNo;
    const DateOfBirth = new Date(picker);
    const month = DateOfBirth.getMonth();
    const day = DateOfBirth.getDate();
    const year = DateOfBirth.getFullYear();
    const dob = `${year}-${month}-${day}`;
    const bloodtype = bloodType.value;
    const pgender = gender.value;
    const paddress = houseNo;
    const district = address.district;
    const subdistrict = address.subdistrict;
    const province = address.province
    const postalCode = address.zipcode;
    const personalID = perID
    const editDate = currentDate;

    const newData = {
      id,
      fname,
      lname,
      phoneNo,
      dob,
      bloodtype,
      pgender,
      paddress,
      district,
      subdistrict,
      province,
      postalCode,
      personalID,
      editDate
    }
    console.log("here is newData")
    console.log(newData)
    if (!fname || !lname || !personalID) {
      return;
    }
    try {
      dispatch(updatePatient(newData))
      setShow(false);

    } catch (error) {
      console.log(error)
    }
  }

  const handlePIDChange = (e) => {
    const ID = e.target.value;
    setPerID(ID);
  }

  const handelNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const handleLnameChange = (e) => {
    setLastName(e.target.value)
  }

  const handleGenderChange = (selectedOption) => {
    setGender(selectedOption)
  }
  const handleBloodChange = (selectedOption) => {
    setBloofType(selectedOption)
  }

  const handlePhoneChange = (e) => {
    const no = e.target.value;
    setTelNo(no);
  }

  const handleHouseNoChange = (e) => {
    setHouseNo(e.target.value)
  }
  const handleAddressChange = (targetName) => (targetValue) => {
    console.log(targetName, targetValue.value);
    setAddress({ [targetName]: targetValue.target.value });
  };

  const handleAdressSelect = (fullAddress) => {
    const addr = houseNo
    const { subdistrict, district, province, zipcode } = fullAddress;
    setAddress({ addr, subdistrict, district, province, zipcode });
  }

  //** END OF RESERVATION */

  // * Convert Age and Date
  const dob = new Date(selectedPatient.dob);
  const birthday = dob.toLocaleDateString('th-TH', option);
  const addedDate = new Date(selectedPatient.addedDate).toLocaleDateString('th-TH', option)
  const editDate = new Date(selectedPatient.editDate).toLocaleDateString('th-TH', option)
  const today = new Date();

  const diffTime = Math.abs(today - dob);
  const Age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));


  //** Handle Confirm Edit */
  const handleConfirmSubmit = (event) => {
    event.preventDefault();
    return MySwal.fire({
      title: 'ยืนยันการแก้ไขข้อมูลผู้ป่วย?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยันการแก้ไข',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        handleSubmit(event)
        toast.success('แก้ไขผู้ป่วยสำเร็จ');
        
      }
    })
  }

  // ** render user img  
  const fullName = selectedPatient.fname + ' ' + selectedPatient.lname
  const renderUserImg = () => {
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

  return (
    <Fragment>
      <Card>

        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedPatient !== null ? selectedPatient.fname + " " + selectedPatient.lname : 'Eleanor Aguilar'}</h4>
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
                <h4 className='mb-0'>{Age}</h4>
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
                    {birthday}
                  </span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>อายุ:</span>
                  <span className='text-capitalize'> {Age} ปี</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>กรุ๊ปเลือด:</span>
                  <span> {selectedPatient.bloodtype} </span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>เบอร์โทรติดต่อ:</span>
                  <span>{selectedPatient.phoneNo}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ที่อยู่:</span>
                  <span>
                    {selectedPatient.address + ', ' +
                      selectedPatient.district + ', ' +
                      selectedPatient.subdistrict + ', ' +
                      selectedPatient.province + ', ' +
                      selectedPatient.postalCode}
                  </span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ลงทะเบียนเมื่อวันที่:</span>
                  <span>{addedDate}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>แก้ไขเมื่อวันที่:</span>
                  <span>{editDate}</span>
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
      {/* MODAL FOR EDIT PATIENT */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' backdrop='static' >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>แก้ไขข้อมูลผู้ป่วย</h1>
            <h5> ลงทะเบียนเมื่อวันที่ {registDate} </h5>
          </div>
          <Form onSubmit={handleConfirmSubmit}>
            <Row className='gy-1 pt-75'>
              <Col>
                <Label className='form-label font-weight-bold' for='firstName'>
                  เลขบัตรประชาชนผู้ป่วย:
                </Label>
                <Input
                  required
                  type='number'
                  placeholder='15xxxxxxxxxxx'
                  pattern='[0-9]{13}'
                  value={perID}
                  onChange={handlePIDChange}
                />
              </Col>
              <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Label className='form-label font-weight-bold' for='firstName'>
                  ชื่อผู้ป่วย:
                </Label>
                <div id='firstName'>
                  <Row>
                    <Col>
                      <Input
                        value={firstName}
                        id='patientName'
                        placeholder='ชื่อจริง'
                        required
                        onChange={handelNameChange}
                      />
                    </Col>
                    <Col>
                      <Input
                        value={lastName}
                        id='patientLastName'
                        placeholder='นามสกุล'
                        required
                        onChange={handleLnameChange}
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <div>
                  <Row>
                    <Col>
                      <Label className='h4 form-label font-weight-bold' for='default-picker'>
                        วันเกิด
                      </Label>
                      <Flatpickr
                        className='form-control'
                        value={picker}
                        onChange={date => setPicker(date)}
                        id='default-picker'
                        style={{ maxWidth: '250px' }}
                        required
                      />
                    </Col>
                    <Col>
                      <Label className='h4 form-label font-weight-bold' for='default-picker'>
                        เพศ
                      </Label>
                      <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        value={gender}
                        onChange={handleGenderChange}
                        options={genderOptions}
                        placeholder='กรุณาเลือกเพศ'
                        isClearable={true}
                        required
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <Row md={12} xs={12}>
                <div>
                  <Row>
                    <Col md={6}>
                      <Label className='h4 form-label font-weight-bold' for='billing-email'>
                        หมู่เลือด:
                      </Label>
                      <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        value={bloodType}
                        onChange={handleBloodChange}
                        options={bloodTypeOption}
                        placeholder='กรุณาเลือกหมู่เลือด'
                        isClearable={true}
                        required
                        style={{ maxWidth: '150px', overflow: 'hidden' }}
                      />
                    </Col>
                    <Col md={6}>
                      <Label className='h4 form-label font-weight-bold' for='billing-email'>
                        เบอร์โทรติดต่อ:
                      </Label>
                      <Input
                        type='number'
                        value={telNo}
                        maxLength={10}
                        placeholder='087xxxxxxx'
                        style={{ maxWidth: '100%' }}
                        onChange={handlePhoneChange}
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <div className='divider'>
                <div className='divider-text'>ข้อมูลที่อยู่</div>
              </div>
              <Row md={12} xs={12}>
                <Col>
                  <Label for='address'>
                    ที่อยู่
                  </Label>
                  <Input
                    value={houseNo}
                    onChange={handleHouseNoChange}
                    id='address'
                    type='textarea'
                    required
                  />
                </Col>
                <div>
                  <Row>
                    <Col md={6}>
                      <Label className='form-label font-weight-bold' for='subdistrict'>
                        ตำบล/แขวง:
                      </Label>
                      <InputAddress
                        required
                        address="subdistrict"
                        value={address.subdistrict}
                        onChange={handleAddressChange('subdistrict')}
                        onSelect={handleAdressSelect}
                        style={{ maxWidth: '100%', width: '300%', height: '40px' }}
                      />

                    </Col>
                    <Col md={6}>
                      <Label className='form-label font-weight-bold' for='district'>
                        อำเภอ/เขต:
                      </Label>
                      <InputAddress
                        required
                        field={'district'}
                        address="district"
                        value={address.district}
                        onChange={handleAddressChange('district')}
                        onSelect={handleAdressSelect}
                        style={{ maxWidth: '100%', width: '300%', height: '40px' }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Label className='form-label font-weight-bold' for='province'>
                        จังหวัด:
                      </Label>
                      <InputAddress
                        required
                        address="province"
                        value={address.province}
                        onChange={handleAddressChange('province')}
                        onSelect={handleAdressSelect}
                        style={{ maxWidth: '100%', width: '300%', height: '40px' }}

                      />
                    </Col>
                    <Col md={6}>
                      <Label className='form-label font-weight-bold' for='zipcode'>
                        รหัสไปรษณีย์:
                      </Label>
                      <InputAddress
                        required
                        address="zipcode"
                        value={address.zipcode}
                        onChange={handleAddressChange('zipcode')}
                        onSelect={handleAdressSelect}
                        style={{ maxWidth: '100%', width: '300%', height: '40px' }}
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  แก้ไขข้อมูลผู้ป่วย
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
