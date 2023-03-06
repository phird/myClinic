// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

// ** Table Columns


// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { useForm, Controller } from 'react-hook-form'
import { ChevronDown, ChevronLeft, Share, Printer, FileText, File, Grid, Copy, Plus, DownloadCloud, X} from 'react-feather'
import { useDropzone } from 'react-dropzone'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Label,
    Button,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    Form,
    CardBody,
    CardHeader,
    CardTitle,
    Modal,
    ModalBody,
    ModalHeader,
    FormGroup,
    InputGroup,
    InputGroupText,
    ListGroupItem,
    ListGroup,

} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Table Header

const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
    //** State
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

    return (
        <Fragment>
            <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
                <Row>
                    <Col xl='6' className='d-flex align-items-center p-0'>
                        <div className='d-flex align-items-center w-100'>
                            <label htmlFor='rows-per-page'>Show</label>
                            <Input
                                className='mx-50'
                                type='select'
                                id='rows-per-page'
                                value={rowsPerPage}
                                onChange={handlePerPage}
                                style={{ width: '5rem' }}
                            >
                                <option value='10'>10</option>
                                <option value='25'>25</option>
                                <option value='50'>50</option>
                            </Input>
                            <label htmlFor='rows-per-page'>Entries</label>
                        </div>
                    </Col>
                    <Col
                        xl='6'
                        className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
                    >
                        <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                            <label className='mb-0' htmlFor='search-invoice'>
                                ค้นหา:
                            </label>
                            <Input
                                id='search-invoice'
                                className='ms-50 w-100'
                                type='text'
                                value={searchTerm}

                            />
                        </div>

                        <div className='d-flex align-items-center table-header-actions'>
                            <UncontrolledDropdown className='me-1'>
                                <DropdownToggle color='secondary' caret outline>
                                    <Share className='font-small-4 me-50' />
                                    <span className='align-middle'>Export</span>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className='w-100'>
                                        <Printer className='font-small-4 me-50' />
                                        <span className='align-middle'>Print</span>
                                    </DropdownItem>
                                    <DropdownItem className='w-100' >
                                        <FileText className='font-small-4 me-50' />
                                        <span className='align-middle'>CSV</span>
                                    </DropdownItem>
                                    <DropdownItem className='w-100'>
                                        <Grid className='font-small-4 me-50' />
                                        <span className='align-middle'>Excel</span>
                                    </DropdownItem>
                                    <DropdownItem className='w-100'>
                                        <File className='font-small-4 me-50' />
                                        <span className='align-middle'>PDF</span>
                                    </DropdownItem>
                                    <DropdownItem className='w-100'>
                                        <Copy className='font-small-4 me-50' />
                                        <span className='align-middle'>Copy</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <Button
                                className='add-new-user'
                                color='primary'
                                onClick={() => setShow(true)}
                            >
                                เพิ่ม
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* MODAL */}
            <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' onClosed={handleModalClosed} backdrop="static">
                <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className='px-sm-5 pt-50 pb-5'>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4'>Single</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                    <DownloadCloud size={64} />
                                    <h5>Drop Files here or click to upload</h5>
                                    <p className='text-secondary'>
                                        Drop files here or click{' '}
                                        <a href='/' onClick={e => e.preventDefault()}>
                                            browse
                                        </a>{' '}
                                        thorough your machine
                                    </p>
                                </div>
                            </div>
                            {files.length ? (
                                <Fragment>
                                    <ListGroup className='my-2'>{fileList}</ListGroup>
                                    <div className='d-flex justify-content-end'>
                                        <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                            Remove All
                                        </Button>
                                        <Button color='primary'>Upload Files</Button>
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

const UploadImageList = () => {
    //** STATE */

    const navigate = useNavigate()
    // ** Handles Label Update
    const handleGoBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }
    return (
        <Fragment>
            <Card className='overflow-hidden'>
                <Row>
                    <Col>
                        <div>
                            <Button.Ripple
                                className='btn-icon'
                                color='flat-success'
                                onClick={e => handleGoBack(e)}
                            >
                                <ChevronLeft size={24} />
                                กลับ
                            </Button.Ripple>
                        </div>
                    </Col>
                </Row>
                <DataTable
                    noHeader
                    subHeader
                    sortServer
                    pagination
                    responsive
                    paginationServer
                    sortIcon={<ChevronDown />}
                    className='react-dataTable'
                    subHeaderComponent={
                        <CustomHeader

                        />
                    }
                />
            </Card>
        </Fragment>
    )
}

export default UploadImageList