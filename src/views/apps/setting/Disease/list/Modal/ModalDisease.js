
// ** React Imports
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// ** Third Party Components
import { Plus, X } from 'react-feather'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Input,
    Label,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Store
import { createDisease } from '../../store'
import { toast } from 'react-hot-toast'


const ModalDisease = ({ open, toggleModal }) => {
    const dispatch = useDispatch()
    const [sName, setSName] = useState('');
    const [inputSymptoms, setInputSymptoms] = useState([]);


    const handleAddDisease = (e) => {
        e.preventDefault()
        const newData = {sName, inputSymptoms}
        console.log(newData)
        try {
            dispatch(createDisease(newData))
            toggleModal()
            toast.success('เพิ่มข้อมูลโรคสำเร็จ')
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = (e) => {  //* for add symtoms
        e.preventDefault();
        const newSymptom = e.target.elements.symptom.value;
        console.log("here what new symptom value : ")
        console.log(newSymptom)
        if (inputSymptoms.length === 0) {
            setInputSymptoms([{ name: newSymptom }]);
        } else {
            setInputSymptoms((prevSymptoms) => [
                ...prevSymptoms,
                { name: newSymptom }
            ]);
        }
        /* props.onSymptomChange(symptoms); */
        e.target.reset();
    };
    const handleDelete = (index) => {
        setInputSymptoms((prevSymptoms) =>
            prevSymptoms.filter((symptom, i) => i !== index)
        );
    };

    return (
        < Modal isOpen={open} className='modal-dialog-centered modal-lg' backdrop="static" >
            <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
            <ModalBody className='px-sm-5 pt-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>เพิ่มข้อมูลโรค</h1>
                </div>
                <Row md={12} xs={12} style={{ marginBottom: '10px' }}>
                    <Col>
                        <Label className='form-label font-weight-bold' for='drugName'>
                            ชื่อโรค
                        </Label>
                        <Input
                            autoFocus={true}
                            value={sName}
                            onChange={(e)=> setSName(e.target.value)}
                            id='drugName'
                            type='text'
                            placeholder='ชื่อโรค'
                        />
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Row className='gy-1 pt-75' >
                        <div className='divider'>
                            <div className='divider-text'>เพิ่มอาการ</div>
                        </div>
                        <Row>
                            <Col sm={12}>
                                <div className="my-2 mx-1 align-items-center justify-content-center">
                                    {/* Here is list of Symptom Shows */}
                                    <div>
                                        <ul className='list-unstyled align-items-center justify-content-between' >
                                            {inputSymptoms.map((symptom, index) => (
                                                <li className='mb-75' key={index}>
                                                    <Row className="align-items-center justify-content-between">
                                                        <Col xs="8" md="8" sm="10" style={{ textOverflow: "ellipsis", overflow: "hidden", }}>
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <span style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}>
                                                                    {symptom.name}
                                                                </span>
                                                            </div>
                                                        </Col>
                                                        <Col xs="auto" md="4">
                                                            <div className="d-flex align-items-center justify-content-end">
                                                                <Button.Ripple
                                                                    className='btn-icon rounded-circle'
                                                                    color='flat-danger'
                                                                    onClick={() => handleDelete(index)}
                                                                >
                                                                    <X size={16} />
                                                                </Button.Ripple>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="my-3">
                                        {/*  Here is submit Button */}
                                        <div className='d-flex form-floating align-items-center justify-content-center'>
                                            <Input
                                                type='text'
                                                name="symptom"
                                                id='floatingInput'
                                                placeholder='เพิ่มอาการ'
                                                style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}
                                                required
                                            />
                                            <label htmlFor='floatingInput' style={{ maxWidth: "90%" }} >อาการ</label>
                                        </div>
                                        <div>
                                            <Button className="my-2" type="submit" color='relief-success' block>เพิ่มอาการ</Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Col xs={12} className='text-center mt-2 pt-50'>
                            <Button type='submit' className='me-1' color='primary' onClick={handleAddDisease}>
                                <Plus size={16} /> เพิ่มข้อมูลโรค
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal >
    )
}
export default ModalDisease