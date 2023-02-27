// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { Plus, X, ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather'

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
  ModalFooter,
  ModalHeader,
  FormFeedback,
  FormGroup,
} from 'reactstrap'

import Select from 'react-select'

// ** Custom Components
import Repeater from '@components/repeater'

//** Third Party Component
import { useForm, Controller } from 'react-hook-form'
import { SlideDown } from 'react-slidedown'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

const MySwal = withReactContent(Swal)

//** Column */

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'ชื่อยา',
    selector: row => row.drugName,
  },
  {
    sortable: true,
    minWidth: '300px',
    name: 'จำนวน',
    selector: row => row.quantity,
  },
  {
    sortable: true,
    name: 'หมายเหตุ',
    selector: row => row.note,
  }
]




const PrescriptionList = () => {
  // ** State
  const [show, setShow] = useState(true)
  const [drugs, setDrugs] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  console.log("here is druglist")
  console.log(drugList)
  useEffect(() => {
    fetchData();
  }, []);

  //** HANDLE MODAL */
  const handleSubmit = (event) => {
    event.preventDefault();
    // Retrieve the values of the form Field
    const drugName = selectedDrugs.value;
    const quantity = document.getElementById('quantity').value;
    const note = document.getElementById('note').value;
    // Store the data in an appropriate data Structure (object)
    const newData = { drugName, quantity, note };
    
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
    setInputValue(e.target.value)
  }

  const handleDrugChange = (selectedOption) => {
    console.log("here is a selected option")
    console.log(selectedOption)
    setSelectedDrugs(selectedOption);
  }

  //** HANLDE MODAL */

  //* Error Alert
  const handleError = () => {
    return MySwal.fire({
      title: 'เกิดข้อผิดพลาด!',
      text: ' กรุณาตรวจสอบยาที่เลือก หรือ จำนานยา!',
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

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    filterData(event.target.value);
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
                  <span className='align-middle ms-25'>สั่งยา</span>
                </Button>
              </Col>
            </Row>
          </Container>
        </CardHeader>
        <CardBody>
          {/* table of drug  */}
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={drugList}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
          />

          {/* end of table of drug  */}
        </CardBody>
      </Card>

      {/* MODAL SECTION  */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' backdrop="static">
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
                  <Label className='form-label font-weight-bold' for='firstName'>
                    ชื่อยา
                  </Label>

                  <FormGroup valid={selectedDrugs !== ''} invalid={selectedDrugs === ''}>
                    <Select
                      id="drugName"
                      placeholder="เลือก หรือ ค้นหายา"
                      options={drugs.map((drug) => ({ value: drug.name, label: drug.name }))}
                      value={selectedDrugs}
                      onChange={handleDrugChange}
                    />
                    <FormFeedback invalid>
                      กรุณาเลือกยา
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <Row md={3} xs={12} style={{ marginBottom: '10px' }}>
                <Col sm={4}>
                  <Label className='h4 form-label font-weight-bold' for='lastName'>
                    ปริมาณ
                  </Label>
                  <FormGroup valid={inputValue !== ''} invalid={inputValue === ''}>
                    <InputGroup>
                      <Input
                        id='quantity'
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder='ตัวอย่าง: 10'
                      />
                      <InputGroupText> เม็ด </InputGroupText>
                    </InputGroup>
                    <FormFeedback invalid>
                      กรุณากรอกปริมาณยา
                    </FormFeedback>
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
