// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// ** Icons Imports
import { Save, Edit, Plus, X } from 'react-feather'

// ** Reactstrap Imports
import {
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    Button,
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

import { editDisease, createSymptom, deleteSymptom } from '../../store'


const EditDisease = ({ id, open, toggleModal, store }) => {
    const dispatch = useDispatch()
    const [sName, setSName] = useState('');
    const [inputSymptoms, setInputSymptoms] = useState([]);
    const [newSymptom, setNewSymptoms] = useState([]);
    const [oldSymptoms, setOldSymptoms] = useState([]);
    const [editAble, setEditAble] = useState(false);


    useEffect(() => {
        setSName(store.selectedDisease?.name)
        setInputSymptoms(store.selectedDisease?.sympList)
        setOldSymptoms(store.selectedDisease?.sympList)
    }, [store.selectedDisease])

    useEffect(() => {
        if (!open) {
            setSName('');
            setInputSymptoms([]);
            setEditAble(false);
        }
    }, [open]);

    const handleEnableEdit = () => {
        setEditAble(!editAble)
    }

    const findNewDisease = (arr) => {
        const newDisease = []
        for (let i = 0; i < arr?.length; i++) {
            if (!arr[i].id) {
                newDisease.push(arr[i])
            }
        }
        return newDisease
    }

    const findMissingDisease = (arr1, arr2) => {
        const arr1Symptoms = arr1?.map(symptom => symptom.name);
        const arr2Symptoms = arr2?.map(symptom => symptom.name);

        const missingDiseases = []
        for (let i = 0; i < arr1?.length; i++) {
            if (!arr2Symptoms.includes(arr1[i].name)) {
                missingDiseases.push(arr1[i])
            }
        }

        return missingDiseases;
    }
    const handleEditDisease = async (e) => {
        console.log("Old ")
        console.log(oldSymptoms)
        console.log("New")
        console.log(inputSymptoms)
        e.preventDefault()
        const newDi = findNewDisease(newSymptom)
        const newDiseaseSymp = { id, newDi }
        const delDi = findMissingDisease(oldSymptoms, inputSymptoms)
        const isDelete = { id, delDi }
        console.log("Delete List ")
        console.log(isDelete)
        const newName = { id, sName }
        if (inputSymptoms.length === 0) {
            toast.error('โรคต้องมีอย่างน้อย 1 อาการ', 5000)
            setInputSymptoms(delDi)
        } else {
            try {
                dispatch(createSymptom(newDiseaseSymp))
                dispatch(deleteSymptom(isDelete))
                dispatch(editDisease(newName))
                setEditAble(false)
                toast.success('แก้ไขข้อมูลโรคสำเร็จ')
            } catch (error) {
                console.log(error)
            }
        }

    }

    const handleSubmit = (e) => {  //* for add symtoms
        e.preventDefault();
        const newSymptomText = e.target.elements.symptom.value;
        console.log("here what new symptom value : ")
        console.log(newSymptomText)
        if (inputSymptoms.length === 0) {
            setInputSymptoms([{ name: newSymptomText }]);
        } else {
            setInputSymptoms((prevSymptoms) => [
                ...prevSymptoms,
                { name: newSymptomText }
            ]);
        }
        if (newSymptom.length === 0) {
            setNewSymptoms([{ name: newSymptomText }])
        } else {
            setNewSymptoms((prevSymptoms) => [
                ...prevSymptoms,
                { name: newSymptomText }
            ])
        }
        /* props.onSymptomChange(symptoms); */
        e.target.reset();
    };

    const handleDelete = (index) => {
        setInputSymptoms((prevSymptoms) =>
            prevSymptoms.filter((symptom, i) => i !== index)
        );
    };

    const confirmEdit = async (event) => {
        event.preventDefault();
        return MySwal.fire({
            title: 'ยืนยันการแก้ไขข้อมูลโรคหรือไม่?',
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
                handleEditDisease(event)
            }
        })
    }


    return (
        < Modal isOpen={open} className='modal-dialog-centered modal-lg' backdrop="static" >
            <ModalHeader className='bg-transparent' toggle={toggleModal}>
                <Button.Ripple color='flat-primary' onClick={handleEnableEdit} >
                    <Edit size={18} /> แก้ไขข้อมูลโรค
                </Button.Ripple>
            </ModalHeader>
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
                            onChange={(e) => setSName(e.target.value)}
                            id='drugName'
                            type='text'
                            placeholder='ชื่อโรค'
                            disabled={!editAble}
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
                                            {inputSymptoms?.map((symptom, index) => (
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
                                                            {editAble === true ?
                                                                <div className="d-flex align-items-center justify-content-end">
                                                                    <Button.Ripple
                                                                        className='btn-icon rounded-circle'
                                                                        color='flat-danger'
                                                                        onClick={() => handleDelete(index)}
                                                                    >
                                                                        <X size={16} />
                                                                    </Button.Ripple>
                                                                </div> :
                                                                <>
                                                                </>}
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
                                                disabled={!editAble}
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
                            <Button type='submit' className='me-1' color='primary' onClick={confirmEdit}>
                                <Plus size={16} /> แก้ไขข้อมูลโรค
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal >
    )
}


export default EditDisease