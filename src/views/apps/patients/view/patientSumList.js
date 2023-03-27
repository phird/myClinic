// ** React Imports
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import classnames from 'classnames'

const MySwal = withReactContent(Swal)
import withReactContent from 'sweetalert2-react-content'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { postEncounter, getPatientEncounter, getDoctorForUser } from '../../encounter/store'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'



const patientSumList = ({ selectedPatient, enDetail }) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.encounters)

  const selectedPatientID = selectedPatient.patientID
  const fullName = selectedPatient.fname + ' ' + selectedPatient.lname
  // MODAL STATES
  // ** State
  const [show, setShow] = useState(false)
  const patientID = selectedPatient.patientID
  const [allPatients, setAllPatients] = useState([]);
  const [sort, setSort] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('encounterID')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** States
  const currentDate = new Date().toISOString().slice(0, 10);
  const [value] = useState('')
  const [doctor, setDoctor] = useState([]);
  const [allDoc, setAllDoc] = useState([]);

  useEffect(() => {
    dispatch(getPatientEncounter(
      {
        selectedPatientID,
        sort,
        sortColumn,
      }
    ))
    dispatch(getDoctorForUser())

  }, [dispatch, selectedPatientID, store.data.length, sort, sortColumn, currentPage])

  useEffect(() => {
    setAllDoc(store.doctorList)
  }, [store.doctorListTotal])


  const handleSubmitEncounter = (event) => {
    event.preventDefault();
    // retrieve the values of the form field 
    const patientID = selectedPatient.patientID;
    const staffID = doctor.value;
    const note = ''; /* document.getElementById('note').value */
    const addedDate = currentDate;
    const newData = { patientID, staffID, note, addedDate };
    // update state 
    if (!patientID || !staffID) {
      toast.error(`กรุณาเลือกแพทย์ผู้รักษา`, { duration: 3000 })
      return;
    }
    try {
      dispatch(postEncounter(newData));
      setShow(false);
      toast.success(`เพิ่มบันทึกการตรวจขอบคุณ ${fullName} สำเร็จ !`, { duration: 3000 })
    } catch (error) {
      console.log(error)
    }
  }
  const handleDoctorChange = (selectedOption) => {
    console.log("here is selected Option")
    console.log(selectedOption)
    setDoctor(selectedOption);
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.encounter.length / rowsPerPage))
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

  const dataToRender = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage

    if (store.encounter.length > 0) {
      return store.encounter.slice(startIndex, endIndex)
    } else if (store.encounter.length === 0) {
      return store.encounter.slice(0, rowsPerPage)
    } else {
      return store.encounter.slice(0, rowsPerPage)
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
      getPatientEncounter({
        selectedPatientID,
        sort,
        sortColumn,
      })
    )
  }

  const defaultValues = {
    doctor: []
  }
  const { control } = useForm({ defaultValues })


  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardHeader className='py-1'>
          <CardTitle tag='h4'>ประวัติการรักษา</CardTitle>
          <Button className='add-new-user' color='primary' onClick={() => setShow(true)}>
            เพิ่มการรักษา
          </Button>
        </CardHeader>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            sortServer
            pagination
            paginationServer
            paginationComponent={CustomPagination}
            columns={columns}
            responsive
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invID'
          />
        </div>
      </Card>

      {/*  MODAL ADD ENCOUNTER BY ID  */}

      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' backdrop="static" >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>เพิ่มการรักษา</h1>
          </div>
          <Form onSubmit={handleSubmitEncounter}>
            <Row className='gy-1 pt-75'>
              <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Label className='form-label font-weight-bold h-3' for='firstName'>
                  ผู้ป่วย
                </Label>
                <Select
                  id="patientName"
                  options={[
                    { value: patientID, label: fullName },
                    // other options...
                  ]}
                  placeholder={fullName}
                  value={patientID}
                  required
                  isDisabled={true}
                />
              </Row>
              <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Label className='h4 form-label font-weight-bold' for='doctorSelect'>
                  แพทย์ผู้ทำการรักษา:
                </Label>
                   
                <Select
                  className='react-select is-invalid'
                  id="patientName"
                  placeholder="เลือก หรือ ค้นแพทย์"
                  options={allDoc.map((doc) => ({ value: doc.staffID, label: doc.fname + "  " + doc.lname }))}
                  required
                  value={doctor}
                  onChange={handleDoctorChange}
                  defaultValue=""

                  style={{ maxWidth: '100%' }}
                />
              </Row>
              {/* <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Input
                  id="note"
                  type="textarea"
                  placeholder='หมายเหตุ'
                  rows='5'
                  style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%", minHeight: "120px" }}
                />
              </Row> */}
              <Col md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Row style={{ marginBottom: '20px' }}>
                  <Label className='h4 form-label font-weight-bold' for='billing-email'>
                    เพิ่มเมื่อวันที่:
                  </Label>
                  <span>    {currentDate}    </span>
                </Row>
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  เพิ่มการตรวจผู้ป่วย
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>


      {/*  MODAL ADD ENCOUNTER BY ID  */}
    </div>
  )
}

export default patientSumList
