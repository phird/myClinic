// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, PlusCircle } from 'react-feather'

// @deno-types="https://unpkg.com/xlsx/types/index.d.ts"
import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';

/* load the codepage support library for extended support with older formats  */
import * as cptable from 'https://unpkg.com/xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);
import { saveAs } from 'file-saver';


//*** Store
import { addDrug, editDrug } from '../store'


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

// ** Table Header
const CustomHeader = ({ store, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {

  const dispatch = useDispatch()

  // **state
  const [show, setShow] = useState(false)
  const [inputDrug, setInputDrug] = useState('')
  const [inputPrice, setInputPrice] = useState(0)
  const [inputUnit, setInputUnit] = useState('')
  const [inputDes, setInputDes] = useState('')


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

    if (!csv.match(/^data:text\/csv;charset=utf-8/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  function downloadExcel(array) {
    const headers = Object.keys(array[0])
    const data = array.map(obj => headers.map(key => obj[key]))

    const worksheet = XLSX.utils.json_to_sheet(array, { header: headers })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'export.xlsx')
  }


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
                <DropdownItem className='w-100' onClick={() => downloadExcel(store.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>EXCEL</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className='add-new-user' color='primary' onClick={() => setShow(true)}>
              เพิ่มยา
            </Button>
          </div>
        </Col>
      </Row>
      {/* // Modal */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' onClosed={handleModalClosed} backdrop="static">
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>เพิ่มข้อมูลยา</h1>
            <p>🚨 กรุณาตรวจสอบ ชื่อยา หน่วย ขอยาให้ครบถ้วน</p>
          </div>
          <Form onSubmit={handlesubmit}>
            <Row className='gy-1 pt-75' >
              <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                <Col>
                  <FormGroup>
                    <Label className='form-label font-weight-bold' for='drugName'>
                      ชื่อยา
                    </Label>
                    <Input
                      autoFocus={true}
                      id='drugName'
                      type='text'
                      placeholder='ชื่อยา'
                      value={inputDrug}
                      onChange={handleNameChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <Label className='h4 form-label font-weight-bold' for='unit'>
                      ราคาต่อหน่วย
                    </Label>
                    <Input
                      id='unit'
                      type='number'
                      placeholder='ราคาต่อหน่วย'
                      value={inputPrice}
                      onChange={handlePriceChange}
                      required
                    />
                  </FormGroup>
                </Col>

                <Col sm={6}>
                  <FormGroup>
                    <Label className='h4 form-label font-weight-bold' for='unit'>
                      หน่วย
                    </Label>
                    <Input
                      id='unit'
                      type='text'
                      placeholder='หน่วยของยา: แผง, เม็ด'
                      value={inputUnit}
                      onChange={handleUnitChange}
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


const DrugsList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.drugs)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('drugID')
  const [rowsPerPage, setRowsPerPage] = useState(10)

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
  }, [dispatch, store.data.length, store.total, sort, sortColumn, searchTerm, currentPage, store.selectedDrug])


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

export default DrugsList
