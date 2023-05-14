// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData, postPatient } from '../store'
import { useDispatch, useSelector } from 'react-redux'


// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import { Thai } from 'flatpickr/dist/l10n/th'
import Select from 'react-select'
import InputAddress from 'react-thailand-address-autocomplete'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'



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
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "O", label: "O" },
  { value: "AB", label: "AB" },
];

// ** Table Header
const CustomHeader = ({ store, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {

  const dispatch = useDispatch()
  // ** Current Date
  const currentDate = new Date().toISOString().slice(0, 10);
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); // Fname and Lname
  const [picker, setPicker] = useState(new Date()); // DOB
  const [gender, setGender] = useState([]); // Gender
  const [bloodType, setBloofType] = useState([]); // Blood Type
  const [houseNo, setHouseNo] = useState('') //House No.
  const [address, setAddress] = useState([{ district: '', subdistrict: '', province: '', zipcode: '' }]);
  const [telNo, setTelNo] = useState(''); // Phone NO.
  const [telNoError, setTelNoError] = useState('');
  const [perID, setPerID] = useState('');
  const [perIDError, setPerIDError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const fname = firstName;
    const lname = lastName;
    const phoneNo = telNo;
    const DateOfBirth = new Date(picker);
    const month = DateOfBirth.getMonth();
    const day = DateOfBirth.getDate();
    const year = DateOfBirth.getFullYear();
    const dob = `${year}-${month + 1}-${day}`;
    const bloodtype = bloodType.value;
    const pgender = gender.value;
    const paddress = address.addr;
    const district = address.district;
    const subdistrict = address.subdistrict;
    const province = address.province
    const postalCode = address.zipcode;
    const personalID = perID
    const addedDate = currentDate;
    const newData = {
      fname,
      lname,
      phoneNo,
      dob,
      bloodtype,
      pgender,
      paddress,
      district,
      subdistrict,
      province,
      postalCode,
      personalID,
      addedDate
    }
    console.log("here is newData")
    console.log(newData)
    if (!fname || !lname || !phoneNo || !dob || !bloodtype || !pgender || !paddress || !district || !subdistrict || !province || !postalCode || !personalID || !addedDate) {
      toast.error("กรุณากรอกข้อมูลให้ครบ  ! ", { duration: 5000 })
      return; // validation failed
    }
    try {
      console.log("im trying")
      dispatch(postPatient(newData));
      setShow(false);
      toast.success("เพิ่มผู้ป่วยสำเร็จ ! ", { duration: 5000 })
      setFirstName('');
      setLastName('');
      setTelNo('');
      setPicker();
      setBloofType([]);
      setGender([]);
      setAddress([{ district: '', subdistrict: '', province: '', zipcode: '' }]);
      setPerID('');
      setHouseNo('');

    } catch (error) {
      console.log(error)
    }
  }

  const handlePIDChange = (e) => {
    // validate Pesonal ID 
    const id = e.target.value;
    setPerID(id);
    if (!/^[0-9]{13}$/.test(e.target.value)) {
      setPerIDError('กรุณากรอกเลขประจำตัวประชาชน 13 หลัก');
    } else {
      setPerIDError('');
    }
  }
  const handleInvalidPID = (e) => {
    const input = e.target
    if (input.validity.valueMissing) {
      input.setCustomValidity('กรุณากรอกเลขประจำตัวประชาชนให้ครบ 13 หลัก');
    } else {
      input.setCustomValidity('');
    }
  }

  const handleNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const handleInvalidName = (e) => {
    const input = e.target
    if (input.validity.valueMissing) {
      input.setCustomValidity('กรุณาชื่อผู้ป่วย');
    } else {
      input.setCustomValidity('');
    }
  }

  const handleLnameChange = (e) => {
    setLastName(e.target.value)
  }
  const handleInvalidLname = (e) => {
    const input = e.target
    if (input.validity.valueMissing) {
      input.setCustomValidity('กรุณานามสกุลผู้ป่วย');
    } else {
      input.setCustomValidity('');
    }
  }

  const handleGenderChange = (selectedOption) => {
    setGender(selectedOption)
  }
  const handleInvalidGender = (e) => {
    e.preventDefault()
    const input = e.target.value
    if (input == null) {
      input.setCustomValidity('กรุณาเลือกเพศ');
    } else {
      input.setCustomValidity('');
    }
  }
  const handleBloodChange = (selectedOption) => {
    setBloofType(selectedOption)
  }
  const handleInvalidBlood = (e) => {
    e.preventDefault()
    const input = e.target.value
    if (!input) {
      toast.danger("กรุณากรอกข้อมูลให้ครบ  ! ", { duration: 5000 })
    } else {
      return;
    }
  }

  const handlePhoneChange = (e) => {
    const no = e.target.value;
    setTelNo(no);
    if (!/^[0-9]{10}$/.test(e.target.value)) {
      setTelNoError('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก');
    } else {
      setTelNoError('');
    }
  }
  const handleInvalidPhone = (e) => {
    const input = e.target
    if (input.validity.valueMissing) {
      input.setCustomValidity('กรุณากรอกหมายเลขโทรศัพท์');
    } else {
      input.setCustomValidity('');
    }
  }

  const handleHouseNoChange = (e) => {
    setHouseNo(e.target.value)
  }
  const handleInvalidHouse = (e) => {
    const input = e.target
    if (input.validity.valueMissing) {
      input.setCustomValidity('กรุณากรอกที่อยู่');
    } else {
      input.setCustomValidity('');
    }
  }

  const handleAddressChange = (targetName) => (targetValue) => {
    setAddress({ [targetName]: targetValue.target.value });
  };

  const handleAdressSelect = (fullAddress) => {
    const addr = houseNo
    const { subdistrict, district, province, zipcode } = fullAddress;
    setAddress({ addr, subdistrict, district, province, zipcode });
  }
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
                placeholder='รหัสผู้ป่วย / ชื่อผู้ป่วย'
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
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' backdrop='static' >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>ลงทะเบียนผู้ป่วย</h1>
            <h5> วันที่ลงทะเบียน {currentDate} </h5>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className='gy-1 pt-75'>
              <Col>
                <Label className='form-label font-weight-bold' for='firstName'>
                  เลขบัตรประชาชนผู้ป่วย:
                </Label>
                <Input
                  required
                  type='number'
                  placeholder='15xxxxxxxxxxx'
                  pattern='[0-9]{13}'
                  value={perID}
                  onChange={handlePIDChange}
                  onInvalid={handleInvalidPID}
                />
                {perIDError && <div style={{ color: 'red' }}>{perIDError}</div>}
              </Col>
              <Row md={12} xs={12} style={{ marginBottom: '20px' }}>
                <Label className='form-label font-weight-bold' for='firstName'>
                  ชื่อผู้ป่วย:
                </Label>
                <div id='firstName'>
                  <Row>
                    <Col>
                      <Input
                        value={firstName}
                        id='patientName'
                        placeholder='ชื่อจริง'
                        required
                        onChange={handleNameChange}
                        onInvalid={handleInvalidName}
                      />
                    </Col>
                    <Col>
                      <Input
                        value={lastName}
                        id='patientLastName'
                        placeholder='นามสกุล'
                        required
                        onChange={handleLnameChange}
                        onInvalid={handleInvalidLname}
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
                        options={{
                          locale: Thai,
                          disableMobile : true
                        }}
                        required
                      />
                    </Col>
                    <Col>
                      <Label className='h4 form-label font-weight-bold' for='default-picker'>
                        เพศ
                      </Label>
                      <Select
                        required
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        value={gender}
                        onChange={handleGenderChange}
                        options={genderOptions}
                        placeholder='กรุณาเลือกเพศ'
                        isClearable={true}
                        onInvalid={handleInvalidGender}
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
                        onInvalid={handleInvalidBlood}
                        style={{ maxWidth: '150px', overflow: 'hidden' }}
                      />
                    </Col>
                    <Col md={6}>
                      <Label className='h4 form-label font-weight-bold' for='billing-email'>
                        เบอร์โทรติดต่อ:
                      </Label>
                      <Input
                        type='number'
                        value={telNo}
                        maxLength={10}
                        placeholder='087xxxxxxx'
                        style={{ maxWidth: '100%' }}
                        onChange={handlePhoneChange}
                        onInvalid={handleInvalidPhone}
                        required
                      />
                      {telNoError && <div style={{ color: 'red' }}>{telNoError}</div>}
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
                    onInvalid={handleInvalidHouse}
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
                        onInvalid={handleInvalidHouse}
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
                        onInvalid={handleInvalidHouse}
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
                        onInvalid={handleInvalidHouse}

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
                        onInvalid={handleInvalidHouse}
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <Col xs={12} className='text-center mt-2 pt-50'>

                <Button
                  type='submit'
                  className='me-1'
                  color='primary'
                >
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


const PatientsList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.patients)
  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('patientID')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(getData(
      {
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
      }
    ))
  }, [dispatch, store.data.length, sort, sortColumn, currentPage, searchTerm])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(getData(
      {
        sort,
        sortColumn,
        q: searchTerm,
        page: page.selected + 1,
        perPage: rowsPerPage,
      }
    ))
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(getData(
      {
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: value,
      }
    ))
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(getData(
      {
        q: val,
        sort,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
      }
    ))
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

    if (store.data.length > 0) {
      return store.data.slice(startIndex, endIndex);
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData?.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    console.log("HandleSort")
    console.log(sortDirection)
    setSort(sortDirection)
    setSortColumn(column.sortField)

    dispatch(getData(
      {
        sort,
        sortDirection,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
      }
    ))
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

export default PatientsList
