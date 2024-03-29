// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData, addService } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  InputGroup,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  FormGroup,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  InputGroupText,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-hot-toast'

const MySwal = withReactContent(Swal)


// ** Table Header
const CustomHeader = ({ store, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {

  const dispatch = useDispatch()
  // ** State 
  const [show, setShow] = useState(false)
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setservicePrice] = useState('');

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result
    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter
        result += item[ky]
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

  // ** Handle for Modal 
  const handleSubmit = (e) => {
    e.preventDefault();
    const sname = serviceName;
    const sprice = servicePrice;
    const newData = {sname, sprice};

    // update state and dispatch action 
    if( !sname || !sprice ) {
      // ** handle an empty data here ;
      return ;
    }
    try {
      dispatch(addService(newData));
      setShow(false)
      toast.success("เพิ่มการบริการสำเร็จ")
      setServiceName('');
      setservicePrice('');
    } catch (error) {
      console.log("it's an error in submit form ! ")
      console.error(error)
    }

  } 

  const handleServiceNameChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setServiceName(value);

  }

  const handleServicePriceChange = (e) => {
    e.preventDefault();
    const price = e.target.value;
    setservicePrice(price);
  }


  return (
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
            <label className='mb-0' htmlFor='search-invoice'>
              ค้นหา:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
              placeholder='ชื่อบริการ'
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <Button className='add-new-user' color='primary' onClick={e => {
              e.preventDefault();
              setShow(true);
              }}>
              เพิ่มการบริการ
            </Button>
          </div>
        </Col>
      </Row>

      {/* Modal Section  */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' backdrop="static">
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>เพิ่มการบริการ</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className='gy-1 pt-75' >
              <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                <Col>
                  <FormGroup>
                    <Label className='form-label font-weight-bold' for='firstName'>
                      ชื่อบริการ:
                    </Label>
                    <Input
                      id="serviceName"
                      placeholder="ชื่อบริการ ตัวอย่าง. นวด"
                      value={serviceName}
                      onChange={handleServiceNameChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row md={3} xs={12} style={{ marginBottom: '10px' }}>
                <Col sm={4}>
                  <FormGroup>
                    <Label className='h4 form-label font-weight-bold' for='lastName'>
                      ปริมาณ
                    </Label>
                    <InputGroup>
                      <Input
                        required
                        id='quantity'
                        type='number'
                        value={servicePrice}
                        onChange={handleServicePriceChange}
                        placeholder='ตัวอย่าง: 100 '
                      />
                      <InputGroupText> บาท </InputGroupText>
                      <FormFeedback >
                        กรุณาราคา
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>

                </Col>
              </Row>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  เพิ่ม
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>

      {/* End Modal Section */}
    </div>
  )
}

const ServiceList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.service)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('serviceID')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })


  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
      })
    )
  }, [dispatch, store.data?.length, store.total, sort, sortColumn, currentPage])

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

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage

    if (store.data?.length > 0) {
      return store.data.slice(startIndex, endIndex)
    } else if (store.data?.length === 0 && isFiltered) {
      return []
    } else {
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

export default ServiceList
