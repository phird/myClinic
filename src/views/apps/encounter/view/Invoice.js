// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,

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
  Badge,
  Input,
  InputGroup,
  InputGroupText,
} from 'reactstrap'

import Select from 'react-select'

// ** Custom Components
import Repeater from '@components/repeater'

//** Imports Icon
import { Plus, X } from 'react-feather'

//** Third Party Component
import { useForm, Controller } from 'react-hook-form'
import { SlideDown } from 'react-slidedown'


// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'



const PrescriptionList = () => {

     //** State for Repeating Form */
  const [count, setCount] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
  }

  const deleteForm = e => {
    e.preventDefault();
    const slideDownWrapper = e.target.closest('.react-slidedown'),
      form = e.target.closest('form');
    if (slideDownWrapper) {
      slideDownWrapper.remove()
    } else {
      form.remove()
    }
  }



  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
    }
  })

  const onSubmit = data => {
  }

  const handleReset = () => {
  }

  // ** Store Vars 
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

          <Repeater count={count}>
            {i => {
              const Tag = i === 0 ? 'div' : SlideDown
              return (
                <Tag key={i}>
                  <Form>
                    <Row className='justify-content-between align-items-center'>
                      <Col md={8} className='mb-md-0 mb-1'>
                        <Label className='form-label' for={`animation-item-name-${i}`}>
                          การรักษา/บริการ
                        </Label>
                        <Input type='text' id={`animation-item-name-${i}`} placeholder='ตรวจร่างกาย, ประคบ' />
                      </Col>
                      <Col md={2} className='mb-md-0 mb-1'>
                        <Label className='form-label' for={`animation-price-${i}`}>
                          ราคา:
                        </Label>
                        <Input
                          type='number'
                          placeholder='10'
                          id={`animation-price-${i}`}
                        />
                      </Col>
                      <Col md={2}>
                        <Button color='danger' className='text-nowrap px-1' onClick={deleteForm} outline>
                          <X size={14} className='me-50' />
                          <span>ลบ</span>
                        </Button>
                      </Col>
                      <Col sm={12}>
                        <hr />
                      </Col>
                    </Row>
                  </Form>
                </Tag>
              )
            }}
          </Repeater>
          <Button className='btn-icon' color='primary' onClick={increaseCount}>
            <Plus size={14} />
            <span className='align-middle ms-25'>เพิ่มค่าใช้จ่าย</span>
          </Button>



        </CardBody>
      </Card>

    </div>
  )
}
export default PrescriptionList
