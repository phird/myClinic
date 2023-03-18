// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
  Badge,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ListGroupItem,
  ListGroup,
} from 'reactstrap'

// ** Icons Imports
import { DownloadCloud, X, Save, Plus } from 'react-feather'

// ** Third Party Components
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'


// ** User Components
import Prescription from './Prescription'
import DoctorBoxs from './DoctorBoxes'
import Invoice from './Invoice'

//** Import from REDUX */
import { useDispatch } from 'react-redux'

//* STORE imports
import { addSymptom, addNote, handleSubmitEncounter } from '../store'
import { postInvoiceList } from '../../invoice/store'
import { postDrugList } from '../../prescription/store'
import { duration } from 'moment/moment'


const UserTabs = ({ selectedEncounter }) => {
  const [show, setShow] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [doctorNote, setDoctorNote] = useState('');
  const [drugsList, setDrugsList] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const eStatus = selectedEncounter.eStatus;
  const invID = selectedEncounter.invID;
  const prescriptionID = selectedEncounter.prescriptionID;

  console.log("Data from SELECTEDENCOUNTER ")
  console.log(selectedEncounter)
  console.log(drugsList)
  console.log(invoiceList)
  console.log("====================")


  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleModalClosed = () => {

  }

  const handleSaveEncounter = (e) => {
    e.preventDefault();
    // POST EACH SYMPTOM
    /* symptoms['encounterID'] =  */
    const encounterID = selectedEncounter.encounterID

    // * add each Symtoms to EncounterSymptom
    symptoms.forEach(symptom => {
      dispatch(addSymptom({ encounterID, symptom }));
    });

    // * add Doctor Note To Encounter
    dispatch(addNote({ encounterID, doctorNote }));

    // * add Each invoice detail to InvoceList
    invoiceList.forEach(invoice => {
      dispatch(postInvoiceList({ invID, invoice }));
    })
    //* add Each prescription to Prescription List
    drugsList.forEach(drugDetail => {
      dispatch(postDrugList({ prescriptionID, drugDetail }));
    })

    //** handleSubmitEncounter by changing eStatus from 1 to 0 */
    dispatch(handleSubmitEncounter(encounterID));

    
    handleReload();

    toast.success("บันทึกการตรวจผู้ป้วยเสร็จสิ้น ", {duration: 5000})
  }

  const handleReload = () => {
    window.location.reload()
  }

  function handleSymptom(newSymptom) {
    setSymptoms(newSymptom);
  }
  function handleNoteAdded(note) {
    setDoctorNote(note);
  }
  function handleDrugSelected(drugList) {
    setDrugsList(drugList);
  }
  function handleInvoiceAdded(invoice) {
    setInvoiceList(invoice);
  }

  return (
    <Fragment>
      <Card>
        {(
          <div>
            {/* Render your component here */}
            <CardBody>
              <Container className='my-2' fluid>
                <Row>
                  <Col className="d-flex justify-content-start align-items-center" >
                    <div className="d-flex">
                      <h3>รายละเอียดทางการตรวจ  #{selectedEncounter.encounterID}</h3>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center" >
                    <div className="d-flex justify-content-end align-items-center">
                      <Button.Ripple
                        color='success'
                        outline
                        className="d-flex  justify-content-center"
                        onClick={() => setShow(true)}
                        block
                      >
                        <Plus size={16} />
                        {/* be back */}
                        <span className='align-middle ms-25'> อัปโหลดรูปภาพ </span>
                        {/* be back */}
                      </Button.Ripple>
                    </div>
                  </Col>

                </Row>
                <div className='my-2'>
                  {eStatus == 0 ? (
                    <>
                      <Badge color='danger' className='d-block'>
                        <span>การตรวจเสร็จสิ้น</span>
                      </Badge>
                    </>
                  )
                    :
                    (null)
                  }
                </div>

              </Container>
              <div>
                <DoctorBoxs onSymptomChange={handleSymptom} onNoteAdded={handleNoteAdded} selectedEncounter={selectedEncounter} />
                <Prescription onDrugSelected={handleDrugSelected} selectedEncounter={selectedEncounter} />
                <Invoice onInvoiceAdded={handleInvoiceAdded} selectedEncounter={selectedEncounter} />
              </div>
              <div>
                {eStatus == 0 ? (
                  <>
                    <Badge color='danger' className='d-block'>
                      <span>การตรวจเสร็จสิ้น</span>
                    </Badge>
                  </>
                )
                  :
                  (<Button.Ripple onClick={handleSaveEncounter} color='danger' outline className="d-flex justify-content-center" block>
                    เสร็จสิ้นการตรวจ
                  </Button.Ripple>)
                }
              </div>
            </CardBody>
          </div>
        )}

      </Card>

      {/* MODAL FOR UPLOADING PICTURE */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' onClosed={handleModalClosed} backdrop="static">
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pb-5'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>อัปโหลดรูปภาพ</CardTitle>
            </CardHeader>
            <CardBody>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div className='d-flex align-items-center justify-content-center flex-column'>
                  <DownloadCloud size={64} />
                  <h5>วางไฟล์ที่นี่ หรือ คลิกเพื่ออัปโหลด</h5>
                  <p className='text-secondary'>
                    วางไฟล์ที่นี่หรือคลิก{' '}
                    <a href='/' onClick={e => e.preventDefault()}>
                      เรียกดูไฟล์
                    </a>{' '}
                    ผ่านเครื่องของคุณ
                  </p>
                </div>
              </div>
              {files.length ? (
                <Fragment>
                  <ListGroup className='my-2'>{fileList}</ListGroup>
                  <div className='d-flex justify-content-end'>
                    <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                      ลบทั้งหมด
                    </Button>

                  </div>
                </Fragment>
              ) : null}
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
      {/* MODAL END  */}
    </Fragment>
  )
}
export default UserTabs
