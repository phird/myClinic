// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import dateFormat from 'dateformat'


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
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  FormGroup,
  UncontrolledTooltip
} from 'reactstrap'

// ** Custom Components

//** Imports Icon
import { Plus, Trash2 } from 'react-feather'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

//** Store imports */
import { getInvoice } from '../../invoice/store'

const InvoiceList = (props) => {
  const dispatch = useDispatch();
  //** Column */
  const columns = [
    {
      name: 'ค่าใช้จ่าย',
      sortable: true,
      selector: row => row.expenseName,
      minWidth: '300px',

    },
    {
      sortable: true,
      selector: row => row.price,
      minWidth: '200px',
      name: 'ราคา',
    }, {
      sortField: 'role',
      cell: row => {
        if (enStatus == 1) {
          return (
            <div className='column-action'>
              <>
                <Link id='delete' onClick={e => {
                  e.preventDefault()
                }}>
                  <Button.Ripple
                    className='btn-icon'
                    color='flat-warning'
                    onClick={() => handleDelete(row.id)}
                  >
                    <Trash2 size={16} />
                  </Button.Ripple>
                </Link>
                <UncontrolledTooltip placement='top' target='delete'>
                  ลบ
                </UncontrolledTooltip>
              </>
            </div>
          )
        } else {
          return (
            <>
              <div className='column-action'>
                <span className='text-capitalize'> เพิ่มเมื่อวันที่: {dateFormat(row.addedDate, "dd/mm/yyyy")} </span>
              </div>
            </>
          )
        }
      }
    }

  ]
  //** Column */

  //** STATE */
  const [show, setShow] = useState(false);
  const [pExpense, setPExpense] = useState([]);
  const [pExpenseRetrive, setPExpenseRetrive] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputPrice, setInputPrice] = useState('');

  // * PROPS Retrive
  const selectedEncounter = props.selectedEncounter
  const enID = selectedEncounter.encounterID
  const enStatus = selectedEncounter.eStatus
  const store = useSelector(state => state.invoice)


  console.log("[invoice] enID ]")
  console.log(enID)
  console.log(store.invoice)

  useEffect(() => {
    dispatch(getInvoice(enID));
  }, [enID, dispatch])

  useEffect(() => {
    setPExpenseRetrive(store.invoice)
  }, [store.invoice])


  useEffect(() => {
    props.onInvoiceAdded(pExpense);
  }, [pExpense]);

  //* HANDLE MODAL

  const handleModalClosed = () => {
    setInputValue('');
    setInputPrice('');

  }

  const handleExpenseChange = (e) => {
    const text = e.target.value;
    setInputValue(text)
  }

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setInputPrice(value);
  }

  const handleRememberMe = (e) => {
  }
  function handleDelete(expenseID) {
    const filterExpense = pExpense.filter(expense => expense.id !== expenseID);
    setPExpense(filterExpense);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseName = inputValue;
    const price = inputPrice;
    const newData = { expenseName, price };

    // Update and Check State
    if (!expenseName || !price) {
      handleError();
      return;
    }
    setPExpense((expenses) => [...expenses, newData]);
    setShow(false);
    // pass invoice to parent
    props.onInvoiceAdded(pExpense);
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
  //** HANDLE MODAL END 

  // ** Store Vars  
  if (enStatus == 1) { //* not done yet
    return (
      <div className='shadow-lg'>
        <Card className='shadow'>
          <CardHeader className='py-1'>
            <Container fluid>
              <Row className='d-flex justify-content-between'>
                <Col sm="6" className='d-flex justify-content-start align-items-center'>
                  <CardTitle className='d-flex'> 🧾 ค่าบริการ </CardTitle>
                </Col>
                <Col sm="6" className='d-flex justify-content-end align-items-center'>
                  <Button className='btn-icon' color='primary' onClick={() => setShow(true)}>
                    <Plus size={14} />
                    <span className='align-middle ms-25'>เพิ่มรายการค่าใช้จ่าย</span>
                  </Button>
                </Col>
              </Row>
            </Container>
          </CardHeader>
          <CardBody>
            <div className='react-dataTable'>
              <DataTable
                noHeader
                responsive
                className='react-dataTable'
                columns={columns}
                data={pExpense}
                sortIcon={<ChevronDown size={10} />}
              />
            </div>

          </CardBody>
        </Card>

        {/*  MODAL START  */}
        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' onClosed={handleModalClosed} backdrop="static">
          <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
          <ModalBody className='px-sm-5 pt-50 pb-5'>
            <div className='text-center mb-2'>
              <h1 className='mb-1'>เพิ่มรายการค่าใช้จ่าย</h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <Row className='gy-1 pt-75' >

                <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                  <Col>
                    <FormGroup>
                      <Label className='form-label font-weight-bold' for='firstName'>
                        ค่าใช้จ่าย
                      </Label>
                      <Input
                        required
                        id='expenseName'
                        onChange={handleExpenseChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={4}>
                    <FormGroup>
                      <Label className='h4 form-label font-weight-bold' for='lastName'>
                        ราคา
                      </Label>
                      <InputGroup>
                        <Input
                          required
                          type='number'
                          placeholder='1000'
                          onChange={handlePriceChange}
                        />
                        <InputGroupText> บาท </InputGroupText>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row md={12} xs={12} style={{ marginBottom: '10px' }} >
                  <Col xs={12} className='mt-2 pt-50 d-flex align-items-start form-check form-check-inline'>
                    <Input type='checkbox' id='basic-cb-unchecked' />
                    <Label for='basic-cb-unchecked' className='form-check-label'>
                      Unchecked
                    </Label>
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
        {/* MODAL END  */}
      </div>
    )
  }
  //* ALready done 
  else {
    return (
      <div className='shadow-lg'>
        <Card className='shadow'>
          <CardHeader className='py-1'>
            <Container fluid>
              <Row className='d-flex justify-content-between'>
                <Col sm="6" className='d-flex justify-content-start align-items-center'>
                  <CardTitle className='d-flex'> 🧾 ค่าบริการ </CardTitle>
                </Col>
              </Row>
            </Container>
          </CardHeader>
          <CardBody>
            <div className='react-dataTable'>
              <DataTable
                noHeader
                responsive
                className='react-dataTable'
                columns={columns}
                data={pExpenseRetrive}
                sortIcon={<ChevronDown size={10} />}
              />
            </div>

          </CardBody>
        </Card>
      </div>
    )
  }
}
export default InvoiceList
