// ** React Imports
import { useState, useEffect } from 'react'
import Flatpickr from 'react-flatpickr'
import { Thai } from 'flatpickr/dist/l10n/th'
import 'flatpickr/dist/themes/dark.css';


// * for tel-phone 
import Cleave from "cleave.js/react"
import 'cleave.js/dist/addons/cleave-phone.th'


// ** Table Columns

// ** Store & Actions
import { getAllData as doctorList } from '../../../staff/store';
import { useDispatch, useSelector } from 'react-redux'
import classnames from "classnames"


import { getAllData as patientList } from '../../../patients/store'
// ** Third Party Components
import Select from 'react-select'
import { Plus } from 'react-feather'


// * Store 
import { addEvent } from '../../store';


// ** Utils
import { selectThemeColors } from '@utils'

// ** Style 
import '@styles/react/apps/app-calendar.scss'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Input,
    Label,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    InputGroup,
    InputGroupText,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-hot-toast';


const ModalDate = ({ openModal2, toggleModal2, Date2 }) => {
    const dispatch = useDispatch()



    // **state
    const [allPatients, setAllPatients] = useState([]); // all patient
    const [allDoctor, setAllDoctor] = useState([]) // all doctor 

    // * User Info
    const [patient, setPatient] = useState(''); // select patient
    const [doctor, setDoctor] = useState([])  // select doctor  -> who gonna see a patient 
    const [note, setNote] = useState('') // note that tell us what patient needs 
    const [phoneNumber, setPhoneNumber] = useState('') // phoneNO
    const [picker, setPicker] = useState(new Date()) // date and time that picked 
    const [staffID, setStaffID] = useState(0) // staff that added an appointment 

    useEffect(() => {
        // get Staff ID 
        const staffIDFromStorage = JSON.parse(localStorage.getItem('userData'));
        if (staffIDFromStorage) {
            setStaffID(staffIDFromStorage.staffID);
        }
        // Get doctor List at first time 
        const fetchData = async () => {
            const data = await dispatch(patientList());
            const doctor = await dispatch(doctorList());
            setAllPatients(data.payload)
            setAllDoctor(doctor.payload)
            // setPicker(conDate(Date2))
        };
        fetchData();
        setPicker(Date2)
    }, [])


    // ** Handle Modal 
    const handleModalClosed = () => {
        // reset all state after close modal 
        setPatient('')
        setDoctor([])
        setNote('')
        setPhoneNumber('')
        setPicker(new Date())
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        const patientData = patient.trim();
        const [fname, lname] = patientData.split(" ") // split name into fname and lastname 
        const foundPatient = allPatients.find(p => p.fname === fname && p.lname === lname);
        const doctorID = doctor.value
        const isoDateString = new Date(picker)
        const utcTimestamp = isoDateString.getTime() - (isoDateString.getTimezoneOffset() * 60000);
        const date = new Date(utcTimestamp).toISOString();
        const addedDate = new Date();

        if (foundPatient) { //* if patient is already registered 
            // if patient is alreay registered 
            const patientID = foundPatient.patientID
            const newData = { patientID, fname, lname, doctorID, staffID, phoneNumber, note, date, addedDate }

            console.log("New data contain: ")
            console.log(newData)
            try {
                dispatch(addEvent(newData))
                toast.success("เพิ่มการนัดหมายสำเร็จ")
                toggleModal2()
            } catch (error) {
                console.error(error)
                toast.danger("เกิดข้อผิดพลาด กรุณาลองอีกครั้ง")
            }

            // * dispatch handle here 

        } else { //* new patient who not rehgister yet 
            // new patient who never resgistered 
            const patientID = 0
            const newData = { patientID, fname, lname, doctorID, staffID, phoneNumber, note, date, addedDate }

            console.log("New data contain: ")
            console.log(newData)

            // ** dispatch handle here 
            try {
                dispatch(addEvent(newData))
                toast.success("เพิ่มการนัดหมายสำเร็จ")
                toggleModal2()
            } catch (error) {
                console.error(error)
                toast.danger("เกิดข้อผิดพลาด กรุณาลองอีกครั้ง")
            }
        }


    }



    const handleNameChange = (e) => {  // handle select or type name of patient 
        e.preventDefault()
        setPatient(e.target.value);
    };

    const handleDoctorSelect = (selectedOption) => { // handle select doctor 
        setDoctor(selectedOption);
    }

    return (
        <div className='text-capitalize'>
            <Modal isOpen={openModal2} className='modal-dialog-centered modal-lg' onClosed={handleModalClosed} backdrop="static">
                <ModalHeader className='bg-transparent' toggle={toggleModal2}></ModalHeader>
                <ModalBody className='px-sm-5 pt-50 pb-5'>
                    <div className='text-center mb-2'>
                        <h1 className='mb-1'>เพิ่มการนัดหมาย</h1>
                    </div>
                    <Form onSubmit={handlesubmit}>
                        <Row className='gy-1 pt-75' >
                            <div className='divider'>
                                <div className='divider-text'>ข้อมูลการนัดหมาย</div>
                            </div>
                            <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                                <Col>
                                    <Label className='form-label font-weight-bold' for='pname'>
                                        ชื่อผู้ป่วย
                                    </Label>
                                    <>
                                        <Input
                                            className='custom-select custom-select-sm'
                                            id='pname'
                                            type="text"
                                            value={patient}
                                            placeholder='ชื่อผู้นัดหมาย'
                                            onChange={handleNameChange}
                                            onInput={(event) => {
                                                const currentValue = event.target.value.toLowerCase();
                                                setPatient(currentValue);
                                            }}
                                            list="suggestions"
                                        />
                                        <datalist className='dflex' id="suggestions" style={{ maxWidth: '100%' }}>
                                            {allPatients?.slice(0, 3).map(patient => (
                                                <option key={patient.patientID} value={patient.fname + " " + patient.lname} onClick={e => setPatient(patient.fname)} />
                                            ))}
                                        </datalist>
                                    </>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label className='h4 form-label font-weight-bold' for='telNo'>
                                            เบอร์โทรติดต่อ
                                        </Label>

                                        <InputGroup className='input-group-merge'>
                                            <InputGroupText
                                                className={classnames({
                                                    //'is-invalid': errors.phoneNo && true
                                                })}
                                            >
                                                TH (+66)
                                            </InputGroupText>
                                            <Cleave
                                                id='phoneNo'
                                                name='phoneNo'
                                                value={phoneNumber}
                                                onChange={e => setPhoneNumber(e.target.value)}
                                                placeholder='081 234 5678'
                                                className={classnames('form-control', {
                                                    'is-invalid': phoneNumber === null && true
                                                })}
                                                options={{
                                                    phone: true,
                                                    phoneRegionCode: 'TH'
                                                }}
                                            // disabled={!editAble}
                                            />
                                            {/* {phoneNumber === '' && <FormFeedback>{'กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก'}</FormFeedback>} */}
                                        </InputGroup>

                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label className='h4 form-label font-weight-bold' for='telNo'>
                                            แพทย์
                                        </Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select'
                                            classNamePrefix='select'
                                            placeholder='ค้นหา/เลือก แพทย์ที่นัดหมาย'
                                            options={allDoctor?.map((doc) => ({ value: doc.staffID, label: doc.fname + " " + doc.lname }))}
                                            required
                                            value={doctor}
                                            onChange={handleDoctorSelect}
                                            styles={{ maxWidth: '100%' }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                                <Col>
                                    <Label className='form-label' for='date-time-picker'>
                                        เลือก เลือก - เวลา ที่ทำการนัดหมาย
                                    </Label>
                                    <Flatpickr
                                        value={Date2}
                                        data-enable-time
                                        id='date-time-picker'
                                        className='form-control'
                                        onChange={date => setPicker(date)}
                                        options={{
                                            locale: Thai,
                                            disableMobile: true,

                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label className='form-label' for='note'>
                                        หมายเหตุ
                                    </Label>
                                    <Input
                                        type='textarea'
                                        name='text'
                                        id='note'
                                        rows='3'
                                        placeholder='ตย. ตรวจร่างกาย, ปรึกษา '
                                        onChange={e => setNote(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Col xs={12} className='text-center mt-2 pt-50'>
                                <Button type='submit' className='me-1' color='primary'>
                                    <Plus size={16} /> เพิ่ม
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}


export default ModalDate