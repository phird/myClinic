// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'

// ** Store & Actions
import { store } from '@store/store'
import { deleteService, getServiceData, editService, getData } from '../store'

// ** Icons Imports
import { Trash2, Edit, Edit2 } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledTooltip, Button, Modal, ModalBody, ModalHeader, Row, Col, Form, Input, InputGroup, InputGroupText, FormGroup, Label } from 'reactstrap'

export const columns = [
  {
    name: '#',
    minWidth: '230px',
    sortable: true,
    sortField: 'serviceID',
    selector: row => row.serviceID,
    cell: row => <span className='text-capitalize'>#{row.serviceID}</span>
  },
  {
    name: 'ชื่อบริการ',
    sortable: true,
    minWidth: '300px',
    sortField: 'sname',
    selector: row => row.sname,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.sname}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'ราคา',
    minWidth: '230px',
    sortable: true,
    sortField: 'sprice',
    selector: row => row.sprice,
    cell: row => <span className='text-capitalize'>{(row.sprice).toLocaleString() + '  ' + 'บาท'}</span>
  },

  {
    name: '',
    minWidth: '100px',
    selector: row => row.serviceID,
    cell: row => {
      const dispatch = useDispatch()
      const [showModal, setShowModal] = useState(false)
      const [selectedService, setSelectedService] = useState([])
      const store = useSelector(state => state.service)

      // ** For retrieve and Change
      const [sname, setSname] = useState(selectedService.sname || '');
      const [sprice, setSprice] = useState(selectedService.sprice || 0);
      console.log(sname)
      console.log(sprice)
      useEffect(() => {
        setSelectedService(store.selectedService)
      }, [dispatch, store.selectedService]);

      console.log(selectedService)
      useEffect(() => {
        setSname(selectedService.sname)
        setSprice(selectedService.sprice)
      }, [selectedService])

      const handleSnameChage = (e) => {
        const value = e.target.value
        setSname(value)
      }
      const handleSpriceChange = (e) => {
        const value = e.target.value
        setSprice(value)
      }

      const handleSubmitChange =(e) => {
        e.preventDefault()
        const serviceID = parseInt(row.serviceID)
        const newData = {
          serviceID,
          sname,
          sprice
        }
        console.log(newData)
        if(!serviceID || !sname || !sprice){
          return ;
        }
        try {
          dispatch(editService(newData))
          setShowModal(false)
          dispatch(getData())
        } catch (error) {
          console.log(error)
        }
      }

      const handleOpenModal = (e) => {
        e.preventDefault();
        dispatch(getServiceData(parseInt(row.serviceID))) // * Dispatch for each service 
        setShowModal(true)
      }

      return (
        <div className='text-capitalize'>
          <>
            <Button.Ripple className='btn-icon rounded-circle me-50' id={`edit-${row.serviceID}`} color='flat-success'
              onClick={handleOpenModal}>
              <Edit size={16} onClick={handleOpenModal} />
            </Button.Ripple>
            <UncontrolledTooltip target={`edit-${row.serviceID}`}>
              แก้ไข
            </UncontrolledTooltip>

            <Button.Ripple className='btn-icon rounded-circle me-50' color='flat-danger' id={`del-${row.serviceID}`} onClick={() => store.dispatch(deleteService(row.serviceID))} >
              <Trash2 size={16} />
            </Button.Ripple>
            <UncontrolledTooltip target={`del-${row.serviceID}`} >
              ลบ
            </UncontrolledTooltip>
          </>

          <Modal isOpen={showModal} className='modal-dialog-centered modal-lg' backdrop="static">
            <ModalHeader className='bg-transparent' toggle={() => setShowModal(!showModal)}>
            </ModalHeader>
            <ModalBody className='px-sm-5 pt-50 pb-5'>
              <div className='text-center mb-2'>
                <h1 className='mb-1'>แก้ไขข้อมูลบริการ</h1>
              </div>
              <Form onSubmit={handleSubmitChange} >
                <Row className='gy-1 pt-75' >
                  <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                    <Col>
                      <FormGroup>
                        <Label className='form-label font-weight-bold' for='firstName'>
                          ชื่อบริการ
                        </Label>
                        <Input
                          required
                          value={sname || ''}
                          className='custom-select custom-select-sm'
                          type="text"
                          onChange={handleSnameChage}
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
                            value={sprice || 0}
                            type='number'
                            placeholder='1000'
                            onChange={handleSpriceChange}
                          />
                          <InputGroupText> บาท </InputGroupText>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Col xs={12} className='text-center mt-2 pt-50'>
                    <Button type='submit' className='me-1' color='primary'>
                      <Edit2 size={16} /> ยืนยันการแก้ไข
                    </Button>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>

        </div >
      )
    }
  }
]
