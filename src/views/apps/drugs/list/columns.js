// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getDrug, editDrug, deleteDrug } from '../store'

// ** Icons Imports
import { Save, Plus, Edit, Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  UncontrolledTooltip,
  Col,
  Row,
  Label,
  Form,
  FormGroup
} from 'reactstrap'
// ** Imports Third Party Component
import { toast } from 'react-hot-toast'
// ** Comfirmation Section
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)


export const columns = [
  {
    name: 'รหัสยา',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row =>
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>#DG{row.drugID}</span>
        </div>
      </div>
  },
  {
    name: 'ชื่อยา',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.drugName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{row.drugName}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: '',
    minWidth: '120px',
    cell: row => {
      const dispatch = useDispatch()
      const [showModal, setShowModal] = useState(false);
      const [editAble, setEditAble] = useState(false);
      const [drugName, setDrugName] = useState('');
      const [drugPrice, setDrugPrice] = useState(0);
      const [unit, setUnit] = useState('');
      const [des, setDes] = useState('');
      const [drug, setDrug] = useState('')
      const store = useSelector(state => state.drugs)
      const id = row.drugID

      useEffect(() => {
        /* setDrug(store.selectedDrug); */
        setDrugName(store.selectedDrug?.drugName);
        setDrugPrice(store.selectedDrug?.drugPrice);
        setUnit(store.selectedDrug?.unit);
        setDes(store.selectedDrug?.description);
      }, [store.selectedDrug])

      const handleShow = (e) => {
        e.preventDefault();
        dispatch(getDrug(parseInt(id)))
        setShowModal(true)
      }
      const handleModalClose = () => {
        setDrugName('');
        setDrugPrice(0);
        setUnit('');
        setDes('');
        setEditAble(false)
      }
      const handleEnableEdit = () => {
        setEditAble(true)
      }

      const handleNameChange = (e) => {
        const value = e.target.value
        setDrugName(value);
      }
      const handlePriceChange = (e) => {
        const value = e.target.value;
        setDrugPrice(value);
      }
      const handleUnitChange = (e) => {
        const value = e.target.value;
        setUnit(value);
      }
      const handleDesChange = (e) => {
        const value = e.target.value;
        setDes(value);
      }

      const onsubmit = (e) => {
        e.preventDefault()
        const drugID = id
        const description = des;
        const newData = { drugID, drugName, drugPrice, unit, description }
        if (!drugName || !unit || !drugPrice) {
          return;
        }
        try {
          dispatch(editDrug(newData))
          setShowModal(false)
          toast.success("แก้ไขข้อมูลยาสำเร็จ")
        } catch (error) {
          console.error(error)
        }

      }

      const handleDelete = (e) => {
        e.preventDefault();
        try {
          dispatch(deleteDrug(id))
        } catch (error) {
          console.log(error)
        }
      }

      const handleConfirmSubmit = async (event) => {
        event.preventDefault();
        return MySwal.fire({
          title: 'ยืนยันการแก้ไขข้อมูลยาหรือไม่?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ยืนยันการแก้ไข',
          cancelButtonText: 'ยกเลิก',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
          },
          buttonsStyling: false
        }).then(function (result) {
          if (result.value) {
            onsubmit(event)
          }
        })
      }

      const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        const result = await MySwal.fire({
          title: 'ยืนยันการลบข้อมูลยาหรือไม่?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ยืนยันการลบ',
          cancelButtonText: 'ยกเลิก',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
          },
          buttonsStyling: false
        })
        if (result.value) {
          handleDelete(event)
          toast.success('ลบข้อมูลยาสำเร็จ')
        }
      }


      return (
        <div className='text-capitalize'>
          {/* View */}
          <Link>
            <Button.Ripple
              id={`view-${row.drugID}`}
              className='btn-icon'
              color='flat-success'
              onClick={handleShow}
            >
              <FileText size={18} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip target={`view-${row.drugID}`}>
            ดูข้อมูลยา
          </UncontrolledTooltip>
          {/* Delete  */}
          <Link>
            <Button.Ripple id={`delete-${row.drugID}`} onClick={handleDeleteSubmit} className='btn-icon' color='flat-danger'>
              <Trash2 size={18} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip target={`delete-${row.drugID}`}>
            ลบ
          </UncontrolledTooltip>

          {/* Modal */}
          <Modal className='modal-dialog-centered modal-lg ' isOpen={showModal} onClosed={handleModalClose}>
            <ModalHeader className='bg-transparent' toggle={() => setShowModal(!showModal)}>
              <Button.Ripple color='flat-primary' onClick={handleEnableEdit} >
                <Edit size={18} /> แก้ไขข้อมูลยา
              </Button.Ripple>
            </ModalHeader>
            <ModalBody className='px-sm-5 pt-50 pb-5'>
              <div className='text-center mb-2'>
                <h3 className='mb-1'>ข้อมูลยา</h3>
              </div>
              <Form onSubmit={handleConfirmSubmit}>
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
                          required
                          onChange={handleNameChange}
                          value={drugName || ''}
                          disabled={!editAble}
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
                          required
                          onChange={handlePriceChange}
                          value={drugPrice || 0}
                          disabled={!editAble}
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
                          required
                          onChange={handleUnitChange}
                          value={unit || ''}
                          disabled={!editAble}
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
                        placeholder='คำอธิยายเกี่ยวกับยา (option)'
                        value={des || ''}
                        onChange={handleDesChange}
                        disabled={!editAble}
                      />
                    </Col>
                  </Row>
                  <Col xs={12} className='text-center mt-2 pt-50'>
                    {editAble && <div>
                      <Button.Ripple type='submit' color='success' >
                        <Save size={18}></Save>  บันทึก
                      </Button.Ripple>
                    </div>}
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>



      )

    }
  }
]
