// ** React Imports
import { useState } from 'react'
// ** Table Columns

// ** Store & Actions

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import InputAddress from 'react-thailand-address-autocomplete'
import toast from 'react-hot-toast'
import { postStaff } from '../store'


// ** Reactstrap Imports
import {
    Row,
    Col,
    Input,
    Button,
    Form,
    Modal,
    ModalBody,
    ModalHeader,
    Label,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import 'flatpickr/dist/themes/dark.css';
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { selectThemeColors } from '@utils'
import { useDispatch } from 'react-redux'

const genderOptions = [
    { value: 'ชาย', label: 'ชาย' },
    { value: 'หญิง', label: 'หญิง' }
]

const bloodTypeOption = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "O", label: "O" },
    { value: "AB", label: "AB" },
];

const AddStaffModal = ({ open, toggleModal }) => {
    const dispatch = useDispatch()
    // ** Current Date
    const currentDate = new Date().toISOString().slice(0, 10);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); // Fname and Lname
    const [picker, setPicker] = useState(new Date()); // DOB
    const [gender, setGender] = useState([]); // Gender
    const [bloodType, setBloofType] = useState([]); // Blood Type
    const [houseNo, setHouseNo] = useState('') //House No.
    const [address, setAddress] = useState([{ district: '', subdistrict: '', province: '', zipcode: '' }]);
    const [telNo, setTelNo] = useState(''); // Phone NO.
    const [telNoError, setTelNoError] = useState('');
    const [perID, setPerID] = useState('');
    const [perIDError, setPerIDError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const fname = firstName;
        const lname = lastName;
        const phoneNo = telNo;
        const DateOfBirth = new Date(picker);
        const month = DateOfBirth.getMonth();
        const day = DateOfBirth.getDate();
        const year = DateOfBirth.getFullYear();
        const dob = `${year}-${month + 1}-${day}`;
        const bloodtype = bloodType.value;
        const pgender = gender.value;
        const paddress = address.addr;
        const district = address.district;
        const subdistrict = address.subdistrict;
        const province = address.province
        const postalCode = address.zipcode;
        const personalID = perID
        const addedDate = currentDate;
        const newData = {
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
            addedDate
        }
        console.log("here is newData")
        console.log(newData)
        if (!fname || !lname || !phoneNo || !dob || !bloodtype || !pgender || !paddress || !district || !subdistrict || !province || !postalCode || !personalID || !addedDate ) {
            toast.error("กรุณากรอกข้อมูลให้ครบ  ! ", { duration: 5000 })
            return; // validation failed
        }
        try {
            console.log("im trying")
            dispatch(postStaff(newData));
            toggleModal();
            toast.success("เพิ่มผู้ป่วยสำเร็จ ! ", { duration: 5000 })
            setFirstName('');
            setLastName('');
            setTelNo('');
            setPicker();
            setBloofType([]);
            setGender([]);
            setAddress([{ district: '', subdistrict: '', province: '', zipcode: '' }]);
            setPerID('');
            setHouseNo('');

        } catch (error) {
            console.log(error)
        }
    }

    const handlePIDChange = (e) => {
        // validate Pesonal ID 
        const id = e.target.value;
        setPerID(id);
        if (!/^[0-9]{13}$/.test(e.target.value)) {
            setPerIDError('กรุณากรอกเลขประจำตัวประชาชน 13 หลัก');
        } else {
            setPerIDError('');
        }
    }
    const handleInvalidPID = (e) => {
        const input = e.target
        if (input.validity.valueMissing) {
            input.setCustomValidity('กรุณากรอกเลขประจำตัวประชาชนให้ครบ 13 หลัก');
        } else {
            input.setCustomValidity('');
        }
    }

    const handleNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleInvalidName = (e) => {
        const input = e.target
        if (input.validity.valueMissing) {
            input.setCustomValidity('กรุณาชื่อผู้ป่วย');
        } else {
            input.setCustomValidity('');
        }
    }

    const handleLnameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleInvalidLname = (e) => {
        const input = e.target
        if (input.validity.valueMissing) {
            input.setCustomValidity('กรุณานามสกุลผู้ป่วย');
        } else {
            input.setCustomValidity('');
        }
    }

    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption)
    }
    const handleInvalidGender = (e) => {
        e.preventDefault()
        const input = e.target.value
        if (input == null) {
            input.setCustomValidity('กรุณาเลือกเพศ');
        } else {
            input.setCustomValidity('');
        }
    }
    const handleBloodChange = (selectedOption) => {
        setBloofType(selectedOption)
    }
    const handleInvalidBlood = (e) => {
        e.preventDefault()
        const input = e.target.value
        if (!input) {
            toast.danger("กรุณากรอกข้อมูลให้ครบ  ! ", { duration: 5000 })
        } else {
            return;
        }
    }

    const handlePhoneChange = (e) => {
        const no = e.target.value;
        setTelNo(no);
        if (!/^[0-9]{10}$/.test(e.target.value)) {
            setTelNoError('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก');
        } else {
            setTelNoError('');
        }
    }
    const handleInvalidPhone = (e) => {
        const input = e.target
        if (input.validity.valueMissing) {
            input.setCustomValidity('กรุณากรอกหมายเลขโทรศัพท์');
        } else {
            input.setCustomValidity('');
        }
    }

    const handleHouseNoChange = (e) => {
        setHouseNo(e.target.value)
    }
    const handleInvalidHouse = (e) => {
        const input = e.target
        if (input.validity.valueMissing) {
            input.setCustomValidity('กรุณากรอกที่อยู่');
        } else {
            input.setCustomValidity('');
        }
    }

    const handleAddressChange = (targetName) => (targetValue) => {
        setAddress({ [targetName]: targetValue.target.value });
    };

    const handleAdressSelect = (fullAddress) => {
        const addr = houseNo
        const { subdistrict, district, province, zipcode } = fullAddress;
        setAddress({ addr, subdistrict, district, province, zipcode });
    }

    return (
        <Modal isOpen={open} className='modal-dialog-centered modal-lg' backdrop='static' >
            <ModalHeader className='bg-transparent' toggle={toggleModal}>
            </ModalHeader>
            <ModalBody className='px-sm-5 pt-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'> เพิ่มข้อมูลบุคลากร  </h1>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row className='gy-1 pt-75'>
                        <Col>
                            <Label className='form-label font-weight-bold' for='firstName'>
                                เลขบัตรประชาชน 13 หลัก:
                            </Label>
                            <Input
                                required
                                type='number'
                                placeholder='15xxxxxxxxxxx'
                                pattern='[0-9]{13}'
                                value={perID}
                                onChange={handlePIDChange}
                                onInvalid={handleInvalidPID}
                            />
                            {perIDError && <div style={{ color: 'red' }}>{perIDError}</div>}
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
                                            onChange={handleNameChange}
                                            onInvalid={handleInvalidName}
                                        />
                                    </Col>
                                    <Col>
                                        <Input
                                            value={lastName}
                                            id='patientLastName'
                                            placeholder='นามสกุล'
                                            required
                                            onChange={handleLnameChange}
                                            onInvalid={handleInvalidLname}
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
                                            required
                                            theme={selectThemeColors}
                                            className='react-select'
                                            classNamePrefix='select'
                                            value={gender}
                                            onChange={handleGenderChange}
                                            options={genderOptions}
                                            placeholder='กรุณาเลือกเพศ'
                                            isClearable={true}
                                            onInvalid={handleInvalidGender}
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
                                            onInvalid={handleInvalidBlood}
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
                                            onInvalid={handleInvalidPhone}
                                            required
                                        />
                                        {telNoError && <div style={{ color: 'red' }}>{telNoError}</div>}
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
                                    onInvalid={handleInvalidHouse}
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
                                            onInvalid={handleInvalidHouse}
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
                                            onInvalid={handleInvalidHouse}
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
                                            onInvalid={handleInvalidHouse}

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
                                            onInvalid={handleInvalidHouse}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                        <Col xs={12} className='text-center mt-2 pt-50'>

                            <Button
                                type='submit'
                                className='me-1'
                                color='primary'
                            >
                                เพิ่ม
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default AddStaffModal