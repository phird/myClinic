// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// ** Invoice List Sidebar

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllEncounter, getEncounterData, postEncounter } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData } from '../../patients/store'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import { appEncountersSlice } from '../store'
import Swal from 'sweetalert2'


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

// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {

  // ** Current Date
  const currentDate = new Date().toISOString().slice(0,10);

  // ** useDispatch 
  const dispatch = useDispatch()

  // ** State
  const [show, setShow] = useState(false)
  const [patient, setPatient] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [patientEn, setPatientEn] = useState([]);
  // ** in this case use patient instead of doctor  -> please fix
  const [doctor, setDoctor] = useState([]);



  // ** Get Patient Data 
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(getAllData());
      setAllPatients(data.payload)
    };
    fetchData();
  }, [dispatch])


  const handleSubmitEncounter = (event) => {
    event.preventDefault();
    // retrieve the values of the form field 
    const patientID = patient.value;
    const staffID = doctor.value;
    const note = document.getElementById('note').value;
    const addedDate = currentDate;
    const newData = { patientID, staffID, note, addedDate };
    // update state 
    if (!patientID || !staffID) {
      return;
    }
    try {
      dispatch(  postEncounter(newData) );
      setShow(false);
      setPatient([]);
      setDoctor([]);
      console.log("end of trying")
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
                id='search-encounter'
                className='ms-50 w-100'
                type='text'
                value={searchTerm}
                onChange={e => handleFilter(e.target.value)}
              />
            </div>

            <div className='d-flex align-items-center table-header-actions'>
              <UncontrolledDropdown className='me-1'>
                <DropdownToggle color='secondary' caret outline>
                  <Share className='font-small-4 me-50' />
                  <span className='align-middle'>Export</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className='w-100'>
                    <Printer className='font-small-4 me-50' />
                    <span className='align-middle'>Print</span>
                  </DropdownItem>
                  <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
                    <FileText className='font-small-4 me-50' />
                    <span className='align-middle'>CSV</span>
                  </DropdownItem>
                  <DropdownItem className='w-100'>
                    <Grid className='font-small-4 me-50' />
                    <span className='align-middle'>Excel</span>
                  </DropdownItem>
                  <DropdownItem className='w-100'>
                    <File className='font-small-4 me-50' />
                    <span className='align-middle'>PDF</span>
                  </DropdownItem>
                  <DropdownItem className='w-100'>
                    <Copy className='font-small-4 me-50' />
                    <span className='align-middle'>Copy</span>
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
                <Label className='h4 form-label font-weight-bold' for='lastName'>
                  แพทย์ผู้ทำการรักษา:
                </Label>
                <Select
                  id="patientName"
                  placeholder="เลือก หรือ ค้นแพทย์"
                  options={allPatients.map((patient) => ({ value: patient.patientID, label: patient.fname + "  " + patient.lname }))}
                  required
                  value={doctor}
                  onChange={handleDoctorChange}
                  defaultValue=""
                  style={{ maxWidth: '100%' }}
                />
              </Row>
              <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Input
                  id="note"
                  type="textarea"
                  placeholder='หมายเหตุ'
                  rows='5'
                  style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%", minHeight: "120px" }}
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




const handleReset = () => {
  dispatch(appEncountersSlice.actions.reset());
};

const EncountersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.encounters)
  // ** States  

  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllEncounter())
    dispatch(
      getEncounterData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
      })
    )
  }, [dispatch, store.data.length, sort, sortColumn, currentPage])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getEncounterData({
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
      getEncounterData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getEncounterData({
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

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getEncounterData({
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
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default EncountersList
