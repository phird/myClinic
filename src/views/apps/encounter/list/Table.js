// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Table Columns
import { columns } from './columns'



// ** Store & Actions
import { getAllEncounter, getEncounterData, postEncounter, forExport } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData } from '../../patients/store'
import { getDoctorForUser } from '../store';

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import { appEncountersSlice } from '../store'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'


const MySwal = withReactContent(Swal)
import withReactContent from 'sweetalert2-react-content'
import Select from 'react-select'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Modal,
  ModalBody,
  ModalHeader,

} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from 'axios';


// @deno-types="https://unpkg.com/xlsx/types/index.d.ts"
/* import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs'; */
import * as XLSX from 'xlsx'

/* load the codepage support library for extended support with older formats  */
import * as cptable from 'https://unpkg.com/xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);
import { saveAs } from 'file-saver';


// ** Table Header
const CustomHeader = ({ store, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Current Date
  const currentDate = new Date().toISOString().slice(0, 10);
  // ** useDispatch 
  const dispatch = useDispatch()
  // ** State
  const [show, setShow] = useState(false)
  const [patient, setPatient] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [patientEn, setPatientEn] = useState([]);
  // ** in this case use patient instead of doctor  -> please fix
  const [doctor, setDoctor] = useState([]);
  const [allDoctor, setAllDoctor] = useState([]);



  // ** Get Patient Data 
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(getAllData());
      setAllPatients(data.payload)
    };
    fetchData();
    setAllPatients(store.allData)
    setAllDoctor(store.doctorList)
    dispatch(forExport());
  }, [dispatch, store.doctorList.length, store.allData.length])

  console.log("all Patient  : ")
  console.log(allPatients)


  function downloadExcel(array) {
    const headers = Object.keys(array[0])
    const data = array.map(obj => headers.map(key => obj[key]))

    const worksheet = XLSX.utils.json_to_sheet(array, { header: headers })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'export.xlsx')
  }

  const handleSubmitEncounter = (event) => {
    event.preventDefault();
    // retrieve the values of the form field 
    const patientID = patient.value;
    const staffID = doctor.value;
    const note = '';  /* document.getElementById('note').value; */
    const addedDate = currentDate;
    const newData = { patientID, staffID, note, addedDate };
    // update state 

    if (!patientID || !staffID) {
      return;
    }
    try {
      dispatch(postEncounter(newData));
      setShow(false);
      toast.success("เพิ่มบันทึกการตรวจสำเร็จ ! ", { duration: 5000 })
      setPatient([]);
      setDoctor([]);
    } catch (error) {
      console.log(error)
    }
  }
  const handlePatientChange = (selectedOption) => {
    setPatient(selectedOption);
  }
  
  const handleDoctorChange = (selectedOption) => {
    console.log("here is selected Option")
    console.log(selectedOption)
    setDoctor(selectedOption);
  }

  const handleModalClosed = () => {
    setPatient([]);
  }
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result
    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.data[0])
    const { id } = useParams();

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }
  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  return (
    <Fragment>
      <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
        <Row>
          <Col xl='6' className='d-flex align-items-center p-0'>
            <div className='d-flex align-items-center w-100'>
              <label htmlFor='rows-per-page'>แสดง</label>
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
              <label htmlFor='rows-per-page'>รายการ</label>
            </div>
          </Col>
          <Col
            xl='6'
            className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
          >
            <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
              <label className='mb-0' htmlFor='search-encounter'>
                ค้นหา:
              </label>
              <Input
                id='search-invoice'
                className='ms-50 w-100'
                type='text'
                value={searchTerm}
                onChange={e => handleFilter(e.target.value)}
                placeholder='ชื่อ / รหัสการตรวจ'
              />
            </div>
            <div className='d-flex align-items-center table-header-actions' >
              <UncontrolledDropdown className='me-1'>
                <DropdownToggle color='secondary' caret outline>
                  <Share className='font-small-4 me-50' />
                  <span className='align-middle'>Export</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className='w-100' onClick={() => downloadExcel(store.forExport)}>
                    <FileText className='font-small-4 me-50' />
                    <span className='align-middle'>EXCEL</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Button
                className='add-new-user'
                color='primary'
                onClick={() => setShow(true)}
              >
                เพิ่มการรักษา
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      
      {/* MODAL SECTION  */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' onClosed={handleModalClosed} backdrop="static" >
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
                  placeholder="เลือก หรือ ค้นผู้ป่วย"
                  options={allPatients.map((patient) => ({ value: patient.patientID, label: patient.fname + "  " + patient.lname }))}
                  value={patient}
                  onChange={handlePatientChange}
                  required
                  defaultValue=""
                />
              </Row>
              <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Label className='h4 form-label font-weight-bold' for='doctor'>
                  แพทย์ผู้ทำการรักษา:
                </Label>
                <Select
                  id="doctor"
                  placeholder="ค้นหา/เลือก แพทย์ผู้ทำการรักษา"
                  options={allDoctor.map((doc) => ({ value: doc.staffID, label: doc.fname + "  " + doc.lname }))}
                  required
                  value={doctor}
                  onChange={handleDoctorChange}
                  defaultValue=""
                  style={{ maxWidth: '100%' }}
                />
              </Row>
              <Col md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Row style={{ marginBottom: '20px' }}>
                  <Label className='h4 form-label font-weight-bold' for='billing-email'>
                    วันที่:
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
    </Fragment>

  )
}

const EncountersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.encounters)

  console.log(store)

  // ** States  
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('encounterID')
  const [rowsPerPage, setRowsPerPage] = useState(10)


  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllEncounter())
    dispatch(
      getEncounterData(
        {
          sort,
          sortColumn,
          q: searchTerm,
          page: currentPage,

        }
      )
    )
    dispatch(getDoctorForUser())
  }, [dispatch, store.data.length, sort, sortColumn, currentPage])

  // ** Function in get data on page change
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getEncounterData(
        {
          sort,
          sortColumn,
          q: searchTerm,
          page: currentPage,

        }
      ))
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getEncounterData(
        {
          sort,
          sortColumn,
          q: val,
          page: currentPage,

        }
      )
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
      return filters[k].length > 0;
    })
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage
    if (store.data.length > 0) {
      console.log("here what inside store data")
      console.log(store.data)
      return store.data.slice(startIndex, endIndex);
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }
  const handleSort = (column, sortDirection) => {
    console.log("HandleSort")
    console.log(sortDirection)
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getEncounterData(
        {
          sort,
          sortDirection,
          sortColumn,
          q: searchTerm,
          page: currentPage,
          perPage: rowsPerPage,
        }
      )
    )
  }

  return (
    <Fragment>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
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

        </div>
      </Card>
    </Fragment>
  )
}

export default EncountersList
