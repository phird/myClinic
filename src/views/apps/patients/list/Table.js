// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'


// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { useForm } from 'react-hook-form'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import InputAddress from 'react-thailand-address-autocomplete'


// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import 'flatpickr/dist/themes/dark.css';

// ** Utils
import { selectThemeColors } from '@utils'

const genderOptions = [
  { value: 'ชาย', label: 'ชาย' },
  { value: 'หญิง', label: 'หญิง' }
]
const bloodTypeOption = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" }
];

// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {

  // ** Current Date
  const currentDate = new Date().toISOString().slice(0, 10);

  const [show, setShow] = useState(false);
  const [name, setName] = useState([{ fname: '', lname: '' }]); // Fname and Lname
  const [picker, setPicker] = useState(new Date()); // DOB
  const [gender, setGender] = useState([]); // Gender
  const [bloodType, setBloofType] = useState([]); // Blood Type
  const [houseNo, setHouseNo] = useState('') //House No.
  const [address, setAddress] = useState([{ addr: '', district: '', subdistrict: '', province: '', zipcode: '' }]);
  const [phoneNO, setPhoneNo] = useState(''); // Phone NO.
  const [personalID, setPersonalID] = useState('');



  const handleSubmit = (event) => {
   
  }

  const handlePIDChange = (e) => {
    const ID = e.target.value;
    setPersonalID(ID);
  }
  const handleNameChange = (targetName) => (e) => {
    setName({ [targetName]: e.target.value });
  }
  const handleGenderChange = (selectedOption) => {
    setGender(selectedOption)
  }
  const handleBloodChange = (selectedOption) => {
    setBloofType(selectedOption)
  }

  const handlePhoneChange = (e) => {
    e.preventDefault();
    const no = e.target.value;
    setPhoneNo(no);
  }

  const handleHouseNoChange = (e) => {
    setHouseNo(e.target.value)
  }
  const handleAddressChange = (targetName) => (targetValue) => {
    console.log(targetName, targetValue.value);
    setAddress({ [targetName]: targetValue.target.value });
  };

  const handleAdressSelect = (fullAddress) => {
    const addr = houseNo
    const { subdistrict, district, province, zipcode } = fullAddress;
    setAddress({ addr, subdistrict, district, province, zipcode });
  }

  console.log(address)
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
                เพิ่มผู้ป่วย
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      {/* MODAL SECTION  */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'  backdrop='static' >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>ลงทะเบียนผู้ป่วย</h1>
            <h5> วันที่ลงทะเบียน {currentDate} </h5>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col>
                <Label className='form-label font-weight-bold' for='firstName'>
                  เลขบัตรประชาชนผู้ป่วย:
                </Label>
                <Input
                  required
                  type='number'
                  placeholder='15xxxxxxxxxxx'
                  maxLength={13}
                  onChange={handlePIDChange}
                />
              </Col>
              <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Label className='form-label font-weight-bold' for='firstName'>
                  ชื่อผู้ป่วย:
                </Label>
                <div id='firstName'>
                  <Row>
                    <Col>
                      <Input
                        onChange={handleNameChange('fname')}
                        value={name.fname}
                        id='patientName'
                        placeholder='ชื่อจริง'
                        required
                      />
                    </Col>
                    <Col>
                      <Input
                        onChange={handleNameChange('lname')}
                        value={name.lname}
                        id='patientName'
                        placeholder='นามสกุล'
                        required
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <div>
                  <Row>
                    <Col>
                      <Label className='h4 form-label font-weight-bold' for='default-picker'>
                        วันเกิด
                      </Label>
                      <Flatpickr
                        className='form-control'
                        value={picker}
                        onChange={date => setPicker(date)}
                        id='default-picker'
                        style={{ maxWidth: '250px' }}
                        required
                      />
                    </Col>
                    <Col>
                      <Label className='h4 form-label font-weight-bold' for='default-picker'>
                        เพศ
                      </Label>
                      <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        value={gender}
                        onChange={handleGenderChange}
                        options={genderOptions}
                        placeholder='กรุณาเลือกเพศ'
                        isClearable={true}
                        required
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <Row md={12} xs={12}>
                <div>
                  <Row>
                    <Col md={6}>
                      <Label className='h4 form-label font-weight-bold' for='billing-email'>
                        หมู่เลือด:
                      </Label>
                      <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        value={bloodType}
                        onChange={handleBloodChange}
                        options={bloodTypeOption}
                        placeholder='กรุณาเลือกหมู่เลือด'
                        isClearable={true}
                        required
                        style={{ maxWidth: '150px', overflow: 'hidden' }}
                      />
                    </Col>
                    <Col md={6}>
                      <Label className='h4 form-label font-weight-bold' for='billing-email'>
                        เบอร์โทรติดต่อ:
                      </Label>
                      <Input
                        type='number'
                        value={phoneNO}
                        maxLength={10}
                        placeholder='087xxxxxxx'
                        style={{ maxWidth: '100%' }}
                        onChange={handlePhoneChange}
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <div className='divider'>
                <div className='divider-text'>ข้อมูลที่อยู่</div>
              </div>
              <Row md={12} xs={12}>
                <Col>
                  <Label for='address'>
                    ที่อยู่
                  </Label>
                  <Input
                    value={houseNo}
                    onChange={handleHouseNoChange}
                    id='address'
                    type='textarea'
                    required
                  />
                </Col>
                <div>
                  <Row>
                    <Col md={6}>
                      <Label className='form-label font-weight-bold' for='subdistrict'>
                        ตำบล/แขวง:
                      </Label>
                      <InputAddress
                        required
                        address="subdistrict"
                        value={address.subdistrict}
                        onChange={handleAddressChange('subdistrict')}
                        onSelect={handleAdressSelect}
                        style={{ maxWidth: '100%', width: '300%', height: '40px' }}
                      />

                    </Col>
                    <Col md={6}>
                      <Label className='form-label font-weight-bold' for='district'>
                        อำเภอ/เขต:
                      </Label>
                      <InputAddress
                        required
                        field={'district'}
                        address="district"
                        value={address.district}
                        onChange={handleAddressChange('district')}
                        onSelect={handleAdressSelect}
                        style={{ maxWidth: '100%', width: '300%', height: '40px' }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Label className='form-label font-weight-bold' for='province'>
                        จังหวัด:
                      </Label>
                      <InputAddress
                        required
                        address="province"
                        value={address.province}
                        onChange={handleAddressChange('province')}
                        onSelect={handleAdressSelect}
                        style={{ maxWidth: '100%', width: '300%', height: '40px' }}

                      />
                    </Col>
                    <Col md={6}>
                      <Label className='form-label font-weight-bold' for='zipcode'>
                        รหัสไปรษณีย์:
                      </Label>
                      <InputAddress
                        required
                        address="zipcode"
                        value={address.zipcode}
                        onChange={handleAddressChange('zipcode')}
                        onSelect={handleAdressSelect}
                        style={{ maxWidth: '100%', width: '300%', height: '40px' }}
                      />
                    </Col>
                  </Row>
                </div>
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
    </Fragment>
  )
}

const onSubmit = data => {
}

const handleReset = () => {
  dispatch(appEncountersSlice.actions.reset());
};

const PatientsList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.patients)
  console.log("this is store")
  console.log(store)
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
    dispatch(getAllData())
    dispatch(
      getData({
        sort,
        q: searchTerm,
        page: currentPage,
      })
    )
  }, [dispatch, store.data.length, sort, currentPage])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        q: searchTerm,
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
        q: searchTerm,
        page: page.selected + 1,
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
        q: searchTerm,
        page: page.selected + 1,
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
      getData({
        sort,
        q: searchTerm,
        page: page.selected + 1,
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

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default PatientsList
