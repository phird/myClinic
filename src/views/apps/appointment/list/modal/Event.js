// ** React Imports
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
// ** Icons Imports
import { FileText, Trash2, Check, Clock, Calendar, UserPlus, User, PenTool, PhoneCall } from 'react-feather'

// ** Reactstrap Imports
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  UncontrolledTooltip,
  Col,
  Row,
  Label
} from 'reactstrap'
// ** Imports Third Party Component
import { toast } from 'react-hot-toast'
// ** Comfirmation Section
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)


import { event } from '../../store'
import { getAllData as StaffList } from '../../../staff/store'


const ModalEvent = ({openModal, toggleModal}) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.appointment)
    //const id = appointmentID  // send id instead of retrieve from row 
    /// Appts State 
    const [patientName, setPatientName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [doctor, setDoctor] = useState('')
    const [dateTime, setDateTime] = useState()
    const [note, setNote] = useState('')
    const [addedDate, setAddedDate] = useState()
    const [staff, setStaff] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(StaffList())
            setStaff(data.payload)
            console.log(staff)
        }
        fetchData()
        // * appts set State 
        setDateTime(store.selectedEvent?.date)
        setPatientName(store.selectedEvent?.patient_name + ' ' + store.selectedEvent?.patient_lastname)
        setDoctor(store.selectedEvent?.staffID)
        setPhoneNo(store.selectedEvent?.contact)
        setNote(store.selectedEvent?.note)
        setAddedDate(store.selectedEvent?.addedDate)
    }, [store.selectedEvent])

    const convertDate = (dt) => {
        const dateString = dt;
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const thaiDate = date.toLocaleDateString('th-TH', options);
        const thaiTime = date.toLocaleTimeString('th-TH', { hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Bangkok' });
        if (thaiTime == '00:00') {
            const readableDate = `${thaiDate}`;
            return readableDate
        }
        const readableDate = `${thaiDate} เวลา ${thaiTime} น.`;
        return readableDate
    }
    const handleShow = (e) => {
        e.preventDefault();
        dispatch(event(parseInt(id)))
        setShowModal(true)
    }

    const handleModalClose = () => {
        setPatientName('')
        setPhoneNo('')
        setDoctor('')
        setDateTime()
        setNote('')
        setAddedDate()
    }

    const searchStaff = (sID) => {
        const result = staff?.find((staffMember) => staffMember.staffID === sID);
        const staffName = result?.fname + ' ' + result?.lname
        return staffName
    }


    return (
        <div className='text-capitalize'>
            <Modal className='modal-dialog-centered modal-lg ' isOpen={openModal} onClosed={handleModalClose}>
                <ModalHeader className='bg-transparent' toggle={toggleModal}>
                </ModalHeader>
                <ModalBody className='px-sm-5 pt-50 pb-5'>
                    <div className='text-center mb-2'>
                        <h3 className='mb-1'>ข้อมูลการนัดหมาย</h3>
                    </div>
                    <hr />
                    <Row className='mb-2'>
                        <span className='h2'> {patientName}</span>
                    </Row>

                    <Row>
                        <Row className='mb-2'>
                            <Col className='d-flex flex-column'>
                                <Label className='form-label font-weight-bold' for='datetime' style={{ fontSize: '1.2rem', fontWeight: 'bold' }} >
                                    <Calendar size={16} /> วันที่นัด
                                </Label>
                                <span id='datetime' className='d-flex h5'> {convertDate(dateTime)} </span>
                            </Col>
                        </Row>

                        <Row className='mb-2'>
                            <Col className='d-flex flex-column'>
                                <Label className='form-label font-weight-bold' for='datetime' style={{ fontSize: '1.2rem', fontWeight: 'bold' }} >
                                    <PhoneCall size={16} /> เบอร์โทรติดต่อผู้ป่วย
                                </Label>
                                <span id='datetime' className='d-flex h5'> {phoneNo} </span>
                            </Col>
                        </Row>

                        <Row className='mb-2'>
                            <Col className='d-flex flex-column'>
                                <Label className='form-label font-weight-bold' for='datetime' style={{ fontSize: '1.2rem', fontWeight: 'bold' }} >
                                    <User size={16} />แพทย์ที่ทำการนัด
                                </Label>
                                <span id='datetime' className='d-flex h5'> {searchStaff(doctor)} </span>
                            </Col>
                        </Row>


                        <Row className='mb-2'>
                            <Col className='d-flex flex-column'>
                                <Label className='form-label font-weight-bold' for='datetime' style={{ fontSize: '1.2rem', fontWeight: 'bold' }} >
                                    <PenTool size={16} /> หมายเหตุ
                                </Label>
                                <span id='datetime' className='d-flex h5'> {note} </span>
                            </Col>
                        </Row>

                        <hr />
                        <Row className='mb-2'>
                            <Col className='d-flex flex-column'>
                                <Label className='form-label font-weight-bold' for='datetime' style={{ fontSize: '1.2rem', fontWeight: 'bold' }} >
                                    <UserPlus size={16} /> ชื่อผู้นัด
                                </Label>
                                <span id='datetime' className='d-flex h5'> {searchStaff(doctor)} </span>
                            </Col>
                        </Row>

                        <Row className='mb-2'>
                            <Col className='d-flex flex-column'>
                                <Label className='form-label font-weight-bold' for='datetime' style={{ fontSize: '1.2rem', fontWeight: 'bold' }} >
                                    นัดเมื่อวันที่
                                </Label>
                                <span id='datetime' className='d-flex h5'> {convertDate(addedDate)} </span>
                            </Col>
                        </Row>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}


export default ModalEvent