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
import { useDispatch, useSelector } from "react-redux";

//* STORE imports
import { addSymptom, addNote, handleSubmitEncounter, addUrl } from '../store'
import { postInvoiceList } from '../../invoice/store'
import { postDrugList } from '../../prescription/store'
import { changeStatusInvoice } from '../../invoice/store'


// * Firebase Storage 
import storage from '../../../../../firebaseConfig'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'



const UserTabs = ({ selectedEncounter, suggestDisease }) => {

  const [show, setShow] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [doctorNote, setDoctorNote] = useState('');
  const [drugsList, setDrugsList] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState('');
  const [percent, setPercent] = useState(0);
  console.log("========== URL =============")
  console.log(url)
  console.log('============================')
  const dispatch = useDispatch();
  const eStatus = selectedEncounter.eStatus;
  const invID = selectedEncounter.invID;
  const prescriptionID = selectedEncounter.prescriptionID;

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

  const handleUploadImg = (e) => {
    e.preventDefault()
    const encounterID = selectedEncounter.encounterID
    files.forEach(file => {
      const storageRef = ref(storage, `/files/${file.name}`)
      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrl(url)
            const exUrl = { encounterID, url };
            dispatch(addUrl(exUrl));
          });
        }
      );
      // * put url into Img_url Table
    })
  }


  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleModalClosed = () => {

  }

  const handleSaveEncounter = async(e) => {    //** File Upload also place here */
    e.preventDefault();
    const encounterID = selectedEncounter.encounterID
    await symptoms.forEach(symptom => {    // * add each Symtoms to EncounterSymptom
       dispatch(addSymptom({ encounterID, symptom }));
    });

    await dispatch(addNote({ encounterID, doctorNote }));    // * add Doctor Note To Encounter
    await invoiceList.forEach(invoice => {    // * add Each invoice detail to InvoceList
      dispatch(postInvoiceList({ invID, invoice }));
    })

    await drugsList.forEach(drugDetail => {    //* add Each prescription to Prescription List
      dispatch(postDrugList({ prescriptionID, drugDetail }));
    })

    await dispatch(handleSubmitEncounter(encounterID));    //** handleSubmitEncounter by changing eStatus from 1 to 0 */

    await dispatch(changeStatusInvoice(encounterID)); //**  changing Invoice.status from 0 to 1 */
    handleReload();
    toast.success("บันทึกการตรวจผู้ป้วยเสร็จสิ้น ", { duration: 5000 })
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
                      <Badge color='success' className='d-block'>
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
                <DoctorBoxs onSymptomChange={handleSymptom} onNoteAdded={handleNoteAdded} selectedEncounter={selectedEncounter} suggestDisease= {suggestDisease} />
                <Prescription onDrugSelected={handleDrugSelected} selectedEncounter={selectedEncounter} />
                <Invoice onInvoiceAdded={handleInvoiceAdded} selectedEncounter={selectedEncounter} />
              </div>
              <div>
                {eStatus == 0 ? (
                  <>
                    <Badge color='success' className='d-block'>
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
                </Fragment>
              ) : null}
            </CardBody>
          </Card>

          <button onClick={handleUploadImg}>Upload to Firebase</button>
          <p>{percent} "% done"</p>

        </ModalBody>
      </Modal>
      {/* MODAL END  */}
    </Fragment>
  )
}
export default UserTabs
