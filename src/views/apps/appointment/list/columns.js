// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

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


import { deleteEvent, event } from '../store'
import { getAllData as StaffList } from '../../staff/store'



export const columns = [
  {
    name: 'รหัสการนัดหมาย',
    sortable: true,
    minWidth: '172px',
    sortField: 'appointmentID',
    selector: row =>
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>#{row.appointmentID}</span>
        </div>
      </div>
  },
  {
    name: 'ชื่อผู้ป่วย',
    sortable: true,
    minWidth: '300px',
    sortField: 'patient_name',
    selector: row => row.patient_name,
    cell: row => {
      const firstName = row.patient_name
      const lastname = row.patient_lastname
      let fullname
      if (lastname) {
        fullname = firstName + " " + lastname
      } else {
        fullname = firstName
      }


      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <Link
              className='user_name text-truncate text-body'
            >
              <span className='fw-bolder'>{fullname}</span>
            </Link>
          </div>
        </div>
      )
    }
  },


  {
    name: 'วันที่ทำการนัดหมาย',
    minWidth: '172px',
    selector: row => row.date,
    cell: row => {
      const currentdate = new Date()
      const date = new Date(row.date)
      const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Bangkok' };  // month if want to make it as a number can change it into numeric
      const thaidate = date.toLocaleDateString('th-TH', options)

      const isPassedDate = currentdate > date

      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='fw-bolder'> {isPassedDate ? <Check size={16} color='green' /> : <Clock size={16} color='orange' />}  {thaidate} </span>
          </div>
        </div>
      )
    }
  },

  {
    name: '',
    minWidth: '120px',
    cell: row => {
      const dispatch = useDispatch()
      const [showModal, setShowModal] = useState(false);
      const store = useSelector(state => state.appointment)
      const id = row.appointmentID
      /// Appts State 
      const [patientName, setPatientName] = useState('')
      const [patientLastName, setPatientLastName] = useState('')
      const [phoneNo, setPhoneNo] = useState('')
      const [doctor, setDoctor] = useState('')
      const [staffID, setStaffID] = useState()
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
        setPatientName("คุณ" + " " + store.selectedEvent?.patient_name)
        setPatientLastName(store.selectedEvent?.patient_lastname)
        setDoctor(store.selectedEvent?.staffID)
        setPhoneNo(store.selectedEvent?.contact)
        setNote(store.selectedEvent?.note)
        setAddedDate(store.selectedEvent?.addedDate)
        setStaffID(store.selectedEvent?.addedBy)
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

      const handleDelete = (e) => {
        e.preventDefault();
        try {
          dispatch(deleteEvent(id))
          /*  dispatch(deleteDrug(id)) */
        } catch (error) {
          console.log(error)
        }
      }

      const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        const result = await MySwal.fire({
          title: 'ยืนยันการลบข้อมูลการนัดหมายหรือไม่?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ยืนยันการลบ',
          cancelButtonText: 'ยกเลิก',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
          },
          buttonsStyling: false
        })
        if (result.value) {
          handleDelete(event)
          toast.success('ลบข้อมูลการนัดหมายสำเร็จ')
        }
      }


      const searchStaff = (sID) => {
        const result = staff.find((staffMember) => staffMember.staffID === sID);
        const staffName = result?.prefix + ' ' + result?.fname + ' ' + result?.lname
        return staffName
      }

      return (
        <div className='text-capitalize'>
          {/* View */}
          <div className='column-action d-flex align-items-center' >
            <Link>
              <Button.Ripple
                id={`view-${row.drugID}`}
                className='btn-icon'
                color='flat-success'
                onClick={handleShow}
              >
                <FileText size={18} />
              </Button.Ripple>
            </Link>
            <UncontrolledTooltip target={`view-${row.drugID}`}>
              ดูข้อมูลการนัดหมาย
            </UncontrolledTooltip>
            {/* Delete  */}
            <Link>
              <Button.Ripple id={`delete-${row.drugID}`} onClick={handleDeleteSubmit} className='btn-icon' color='flat-danger'>
                <Trash2 size={18} />
              </Button.Ripple>
            </Link>
            <UncontrolledTooltip target={`delete-${row.drugID}`}>
              ลบ
            </UncontrolledTooltip>
          </div>
          {/* Modal */}
          <Modal className='modal-dialog-centered modal-lg ' isOpen={showModal} onClosed={handleModalClose}>
            <ModalHeader className='bg-transparent' toggle={() => setShowModal(!showModal)}>
            </ModalHeader>
            <ModalBody className='px-sm-5 pt-50 pb-5'>
              <div className='text-center mb-2'>
                <h3 className='mb-1'>ข้อมูลการนัดหมาย</h3>
              </div>
              <hr />
              <Row className='mb-2'>
                <span className='h2'> {patientName + " " + (patientLastName === null ? " " : patientLastName)}</span>
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
                    <span id='datetime' className='d-flex h5'> {searchStaff(staffID)} </span>
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
  }
]
