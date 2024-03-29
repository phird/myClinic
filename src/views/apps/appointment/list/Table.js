// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import Flatpickr from 'react-flatpickr'
import { Thai } from 'flatpickr/dist/l10n/th'
import 'flatpickr/dist/themes/dark.css';


// * for tel-phone 
import Cleave from "cleave.js/react"
import 'cleave.js/dist/addons/cleave-phone.th'


// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData, getEvent } from '../store'
import { getAllData as doctorList } from '../../staff/store';
import { useDispatch, useSelector } from 'react-redux'
import classnames from "classnames"


import { getAllData as patientList } from '../../patients/store'
// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Plus, Check, Info } from 'react-feather'


// * Store 
import { addEvent } from '../store';

// * Component
import AppointmentCard from './AppointmentCard'
import ModalEvent from './modal/Event'
import ModalDate from './modal/Date';

// ** Utils
import { selectThemeColors } from '@utils'

// ** Style 
import '@styles/react/apps/app-calendar.scss'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
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

const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
}

// ** Table Header
const CustomHeader = ({ store, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  const dispatch = useDispatch()


  // **state
  const [show, setShow] = useState(false)  // boolean state for opening a modal 
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
    };
    fetchData();
  }, [])

  console.log("Current StaffID is ")
  console.log(staffID)

  // ** Handle Modal 
  const handleModalClosed = () => {
    // reset all state after close modal 

    // * Reset all the state 
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
      const newData = { patientID, fname, lname, doctorID, staffID,phoneNumber, note, date, addedDate }

      console.log("New data contain: ")
      console.log(newData)
      try {
        dispatch(addEvent(newData))
        toast.success("เพิ่มการนัดหมายสำเร็จ")
        setShow(false)
      } catch (error) {
        console.error(error)
        toast.danger("เกิดข้อผิดพลาด กรุณาลองอีกครั้ง")
      }

      // * dispatch handle here 

    } else { //* new patient who not rehgister yet 
      // new patient who never resgistered 
      const patientID = 0
      const newData = { patientID, fname, lname, doctorID, staffID,phoneNumber, note, date, addedDate }

      console.log("New data contain: ")
      console.log(newData)

      // ** dispatch handle here 
      try {
        dispatch(addEvent(newData))
        toast.success("เพิ่มการนัดหมายสำเร็จ")
        setShow(false)
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
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'> แสดง </label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'> รายการ </label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              ค้นหา:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <Button className='add-new-user' color='primary' onClick={() => setShow(true)}>
              เพิ่มการนัดหมาย
            </Button>
          </div>
        </Col>
      </Row>

      {/* // Modal SECTION */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' onClosed={handleModalClosed} backdrop="static">
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
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
                    value={picker}
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


const AppointmentList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.appointment)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('appointmentID')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [toggleEvent, setToggleEvent] = useState(false)
  const toggle = () => setToggleEvent(!toggleEvent)
  const [toggleEvent2, setToggleEvent2] = useState(false)
  const toggle2 = () => setToggleEvent2(!toggleEvent2)

  // from calendar to modal 
  const [datePick, setDatePick] = useState()


  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(
      getData({
        q: searchTerm,
        sort,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
      })
    )
    dispatch(getEvent())
  }, [dispatch, store.data?.length, store.total, sort, sortColumn, searchTerm, currentPage, store.selectedDrug])
  // ** Blank Event Object
  
  
  const blankEvent = {
    patientName: '',
    start: '',
    allDay: false,
  }

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
      })
    )
    setCurrentPage(page.selected + 1)
  }
  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
      })
    )
    setRowsPerPage(value)
  }
  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,

      })
    )
  }
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }
  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    if (store.data?.length > 0) {
      return store.data.slice(startIndex, endIndex)
    } else if (store.data?.length === 0 /* && isFiltered */) {
      return []
    } else {
      //console.log("i render all data instead of getData")
      return store.allData?.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    if (sortDirection.toLowerCase() == 'asc') {
      sortDirection = 'desc'
    } else {
      sortDirection = 'asc'
    }
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
      })
    )
  }

  return (
    <Fragment>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <AppointmentCard
            dispatch={dispatch}
            store={store}
            setDate={setDatePick}
            blankEvent={blankEvent}
            calendarsColor={calendarsColor}
            toggleEvent={toggle}
            toggleDate = {toggle2}
          />
          <ModalEvent openModal={toggleEvent} toggleModal={toggle}/>
          <ModalDate  openModal2={toggleEvent2} toggleModal2={toggle2} Date2={datePick}/> 
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
          <div className='d-flex p-1 justify-content-end border'>
            <span><Info size={16} color='red' /> เครื่องหมาย <Check size={16} color='green' /> หมายถึง การนัดหมายที่ผ่านไปแล้ว  </span>
          </div>
        </div>
      </Card>
    </Fragment>
  )
}

export default AppointmentList
