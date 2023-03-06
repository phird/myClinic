// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// ** Third Party Components
import DataTable from 'react-data-table-component'
import { Plus, ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy, Trash2, Circle } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Container,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback,
  FormGroup,
  UncontrolledTooltip,
} from 'reactstrap'

import Select from 'react-select'


// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

const MySwal = withReactContent(Swal)




export function handleDelete(drugID, drugList, setDrugList) {
  const filterDrugs = drugList.filter(drug => drug.drugID !== drugID);
  setDrugList(filterDrugs);
}


const PrescriptionList = () => {
  
  //** Column */
  const columns = [
    {
      name: 'ชื่อยา',
      sortable: true,
      minWidth: '300px',
      selector: row => row.drugName,
      cell: row => {
        return (
          <div className='d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column'>
              <span className='fw-bolder'> {row.drugName}</span>
            </div>
          </div>
        )
      }
    },
    {
      sortable: true,
      minWidth: '200px',
      name: 'จำนวน',
      selector: row => row.quantity,
    },
    {
      name: 'หมายเหตุ',
      selector: row => row.note,
    },
    {
      sortField: 'role',
      cell: row => {
        return (
          <div className='column-action'>
            <>
              <Link id='delete' onClick={e => {
                e.preventDefault()
              }}>
                <Button.Ripple
                  className='btn-icon'
                  color='flat-warning'
                  onClick={() => handleDelete(row.drugID)}
                >
                  <Trash2 size={16} />
                </Button.Ripple>
              </Link>
              <UncontrolledTooltip placement='top' target='delete'>
                ลบรายการยา
              </UncontrolledTooltip>
            </>
          </div>
        )
      }
    }
  ]
  //** Column */

  // ** State
  const [show, setShow] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  //* Validation
  const [validated, setValidated] = useState(false);


  console.log("here is DrugList")
  console.log(drugList)

  useEffect(() => {
    fetchData();
  }, []);

  //** HANDLE MODAL */
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Retrieve the values of the form Field
    const drugID = selectedDrugs.value
    const drugName = selectedDrugs.label;
    const quantity = document.getElementById('quantity').value;
    const note = document.getElementById('note').value;
    // Store the data in an appropriate data Structure (object)
    const newData = { drugID, drugName, quantity, note };

    // Update state
    if (!quantity || !drugName) {
      handleError();
      return;
    }
    setDrugList((drugs) => [...drugs, newData]);
    // Close Modal
    setShow(false);
    // re-state to initialize 
    setSelectedDrugs([]);
    setInputValue('');
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value)

  }

  const handleDrugChange = (selectedOption) => {
    setSelectedDrugs(selectedOption);
  }

  const handleModalClosed = () => {
    setSelectedDrugs([]);
    setInputValue('');
  }
  //** HANLDE MODAL */

  function handleDelete(drugID) {
    const filterDrugs = drugList.filter(drug => drug.drugID !== drugID);
    setDrugList(filterDrugs)
  }


  //* Error Alert
  const handleError = () => {
    return MySwal.fire({
      title: 'เกิดข้อผิดพลาด!',
      text: ' กรุณาตรวจสอบ ชื่อยา ปริมาณ ยาให้ครบถ้วน',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8000/drugs/allDrugs');
    console.log(response.data)
    setDrugs(response.data);
    setFilteredData(response.data);
  };

  const filterData = (query) => {
    const filtered = drugs.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // ** Store Vars 
  return (
    <div className='shadow-lg'>
      <Card className='shadow'>
        <CardHeader className='py-1'>
          <Container fluid>
            <Row className='d-flex justify-content-between'>
              <Col sm="6" className='d-flex justify-content-start align-items-center'>
                <CardTitle className='d-flex'> 📝 การสั่งยา </CardTitle>
              </Col>
              <Col sm="6" className='d-flex justify-content-end align-items-center'>
                <Button className='btn-icon' color='primary' onClick={() => setShow(true)}>
                  <Plus size={14} />
                  <span className='align-middle ms-25'>เพิ่มรายการยา</span>
                </Button>
              </Col>
            </Row>
          </Container>
        </CardHeader>
        <CardBody>
          {/* table of drug  */}
          <div className='react-dataTable'>
            <DataTable
              noHeader
              responsive
              columns={columns}
              data={drugList}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
            />

          </div>

          {/* end of table of drug  */}
        </CardBody>
      </Card>

      {/* MODAL SECTION  */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' onClosed={handleModalClosed} backdrop="static">
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>เพิ่มรายการยา</h1>
            <p>🚨 กรุณาตรวจสอบ ชื่อยา ปริมาณ ยาให้ครบถ้วน</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className='gy-1 pt-75' >
              <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                <Col>
                  <FormGroup>
                    <Label className='form-label font-weight-bold' for='firstName'>
                      ชื่อยา
                    </Label>
                    <Select
                      id="drugName"
                      placeholder="เลือก หรือ ค้นหายา"
                      options={drugs.map((drug) => ({ value: drug.drugID, label: drug.name }))}
                      value={selectedDrugs}
                      onChange={handleDrugChange}
                      required
                      defaultValue=""
                    />
                    <FormFeedback >
                      กรุณาเลือกยา
                    </FormFeedback>
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
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder='ตัวอย่าง: 10'
                      />
                      <InputGroupText> เม็ด </InputGroupText>
                      <FormFeedback >
                        กรุณากรอกปริมาณยา
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>

                </Col>
              </Row>

              <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                <Col>
                  <Label className='h4 form-label font-weight-bold' for='status'>
                    หมายเหตุ:
                  </Label>
                  <Input
                    id='note'
                    type='textarea'
                    rows='2' />
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
    </div >
  )
}
export default PrescriptionList
