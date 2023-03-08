// ** React Imports
import { Fragment, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// ** Reactstrap Imports
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
  ButtonGroup,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  InputGroup,
  InputGroupText,
  ListGroupItem,
  ListGroup,
} from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, DownloadCloud, X } from 'react-feather'

// ** Third Party Components
import { useDropzone } from 'react-dropzone'

// ** User Components
import Prescription from './Prescription'
import DoctorBoxs from './DoctorBoxes'
import Invoice from './Invoice'






const UserTabs = ({ active, toggleTab }) => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([])
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

  const handleSubmit = () => {

  }
  const handleModalClosed = () => {

  }

  const handleEndEncounter = () => {

  }

  /*  const handleUploadClick = (id) => {
     console.log("click it ")
     navigate(`/apps/encounter/view/${id}/upload`)
   } */
  return (
    <Fragment>
      <Card>
        <CardBody>
          <Container className='my-2' fluid>
            <Row>
              <Col className="d-flex justify-content-start align-items-center" >
                <div className="d-flex">
                  <h3>รายละเอียดทางการตรวจ</h3>
                </div>
              </Col>
              <Col className="d-flex justify-content-end align-items-center" >
                <div className="d-flex justify-content-end align-items-center">
                  <Button.Ripple
                    color='success'
                    className="d-flex mx-2 justify-content-center"
                    onClick={() => setShow(true)}
                    block
                  >
                    อัปโหลดรูปภาพ
                  </Button.Ripple>
                  <Button.Ripple color='danger' outline className="d-flex justify-content-center" block>
                    เสร็จสิ้นการตรวจ
                  </Button.Ripple>
                </div>
              </Col>
            </Row>
          </Container>


          <div>
            <DoctorBoxs />
            <Prescription />
            <Invoice />
          </div>


        </CardBody>
      </Card>

      {/* MODAL */}
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
