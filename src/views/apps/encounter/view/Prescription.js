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
} from 'reactstrap'

//** Imports Icon
import { Plus,Check,X } from 'react-feather'

//** Third Party Component
import { useForm, Controller } from 'react-hook-form'

// ** Styles

import '@styles/react/libs/tables/react-dataTable-component.scss'

const PrescriptionList = () => {
  // ** State
  const [show, setShow] = useState(false)

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
                <CardTitle className='d-flex'> 📝 การสั่งยา </CardTitle>
              </Col>
              <Col sm="3" className='d-flex justify-content-end align-items-center'>
                <Button className='d-flex  justify-content-center' 
                  color='gradient-success' 
                  onClick={() => setShow(true)}
                  block>
                  <Plus size={16} />
                  <div className='px-auto'>
                    สั่งยา
                  </div>
                </Button>
              </Col>
            </Row>
          </Container>
        </CardHeader>
        <CardBody>

          <div className="prescription-info card" outline>
            <div className="prescription-item">
              <span className="item-label h4">ชื่อยา: </span>
              <span className="item-value px-1">ยาพารา</span>
            </div>
            <div className="prescription-item">
              <span className="item-label">ปริมาณ:</span>
              <span className="item-value px-1">1 เม็ด</span>
            </div>
            <div className="prescription-item">
              <span className="item-label">วิธีใช้:</span>
              <span className="item-value px-1">ก่อนอาหาร 3 ครั้งต่อวัน</span>
            </div>
            <div className="prescription-item">
              <span className="item-label">หมายเหตุ:</span>
              <span className="item-value px-1">ใช้ต่อเนื่อง 3 วัน</span>
            </div>
          </div>

        </CardBody>
      </Card>

      {/* MODAL SECTION  */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' backdrop="static">
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>เพิ่มรายการยา</h1>
            <p>🚨 กรุณาตรวจสอบ ปริมาณ วิธีใช้ ยาให้ครบถ้วน</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Row md={6} xs={12}>
                <Label className='form-label font-weight-bold' for='firstName'>
                  ชื่อยา
                </Label>
              </Row>
              <Row md={6} xs={12}>
                <Label className='h4 form-label font-weight-bold' for='lastName'>
                  ปริมาณ
                </Label>
                
              </Row>
              <Col md={6} xs={12}>
                <Label className='h4 form-label font-weight-bold' for='billing-email'>
                  วิธีใช้
                </Label>
               
              </Col>
              <Row md={6} xs={12}>
                <Label className='h4 form-label font-weight-bold' for='status'>
                  หมายเหตุ:
                </Label>
                
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
    </div>
  )
}
export default PrescriptionList
