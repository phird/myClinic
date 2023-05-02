// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData, getEvent } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, PlusCircle, Check, Info } from 'react-feather'

// @deno-types="https://unpkg.com/xlsx/types/index.d.ts"
import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';

/* load the codepage support library for extended support with older formats  */
import * as cptable from 'https://unpkg.com/xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);
import { saveAs } from 'file-saver';


//*** Store
import { addDrug, editDrug } from '../store'

// * Component
import AppointmentCard from './AppointmentCard'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  FormFeedback,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-hot-toast'

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
  const [inputDrug, setInputDrug] = useState('')
  const [inputPrice, setInputPrice] = useState(0)
  const [inputUnit, setInputUnit] = useState('')
  const [inputDes, setInputDes] = useState('')

  // ** Handle Modal 
  const handleModalClosed = () => {
    setInputDrug('');
    setInputPrice(0);
    setInputUnit('');
    setInputDes('');
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    const drugName = inputDrug;
    const drugPrice = inputPrice;
    const unit = inputUnit;
    const description = inputDes;
    const newData = { drugName, drugPrice, unit, description }

    if (!drugName || !unit || !drugPrice) {
      return;
    }
    try {
      dispatch(addDrug(newData))
      setShow(false)
      toast.success("เพิ่มข้อมูลยาสำเร็จ")
    } catch (error) {
      console.error(error)
    }
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setInputDrug(value)
  }

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setInputPrice(value)
  }


  const handleUnitChange = (e) => {
    const value = e.target.value;
    setInputUnit(value);
  }

  const handleDesChange = (e) => {
    const value = e.target.value;
    setInputDes(value);
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
            <h1 className='mb-1'>เพิ่มข้อการนัดหมาย</h1>
          </div>
          <Form onSubmit={handlesubmit}>
            <Row className='gy-1 pt-75' >
              <div className='divider'>
                <div className='divider-text'>ข้อมูลการนัดหมาย</div>
              </div>
              <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                <Col>
                  <Label className='form-label font-weight-bold' for='fname'>
                    ชื่อผู้ป่วย
                  </Label>
                  <Input
                    autoFocus={true}
                    id='fname'
                    type='text'
                    placeholder='ชื่อจริง'
                    value={inputDrug}
                    onChange={handleNameChange}
                    required
                  />
                </Col>
                <Col>
                  <Label className='form-label font-weight-bold' for='lname'>
                    นามสกุล
                  </Label>
                  <Input
                    autoFocus={true}
                    id='lname'
                    type='text'
                    placeholder='นามสกุล'
                    value={inputDrug}
                    onChange={handleNameChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <Label className='h4 form-label font-weight-bold' for='telNo'>
                      เบอร์โืทรติดต่อ
                    </Label>
                    <Input
                      id='telNo'
                      type='number'
                      placeholder='ราคาต่อหน่วย'
                      value={inputPrice}
                      onChange={handlePriceChange}
                      required
                    />
                  </FormGroup>
                </Col>

                

              </Row>
              <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                <Col>
                  <Label className='h4 form-label font-weight-bold' for='note'>
                    คำอธิบาย:
                  </Label>
                  <Input
                    id='note'
                    type='textarea'
                    rows='2'
                    value={inputDes}
                    placeholder='คำอธิยายเกี่ยวกับยา (option)'
                    onChange={handleDesChange}
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
  }, [dispatch, store.data.length, store.events.length, store.total, sort, sortColumn, searchTerm, currentPage, store.selectedDrug])

  // ** Blank Event Object
  const blankEvent = {
    title: '',
    start: '',
    end: '',
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

    if (store.data.length > 0) {
      return store.data.slice(startIndex, endIndex)
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
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
        <CardBody >
          <AppointmentCard
            dispatch={dispatch}
            store={store}
            blankEvent={blankEvent}
            calendarsColor={calendarsColor}
          />
          <div className='d-flex p-1 justify-content-end'>

          </div>
        </CardBody>
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
          <div className='d-flex p-1 justify-content-end border'>
            <span><Info size={16} color='red' /> เครื่องหมาย <Check size={16} color='green' /> หมายถึง การนัดหมายที่ผ่านไปแล้ว  </span>
          </div>
        </div>
      </Card>


    </Fragment>
  )
}

export default AppointmentList
