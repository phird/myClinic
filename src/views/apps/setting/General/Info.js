import { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
// ** Third Party Components
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import classnames from "classnames"
import Flatpickr from 'react-flatpickr'
import { Thai } from "flatpickr/dist/l10n/th"

import Cleave from "cleave.js/react"
import 'cleave.js/dist/addons/cleave-phone.th'

// ** Store & Action
import { getAllData, updateClinic } from './store'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Form, Label, Input, InputGroup, InputGroupText, FormFeedback, Col, Row } from 'reactstrap'

// *  Confirnation Section
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const MySwal = withReactContent(Swal)



const Info = () => {
    const dispatch = useDispatch()

    // ** state
    const [data, setData] = useState()
    // State For form 
    const [name, setName] = useState("")
    const [des, setDes] = useState("")
    const [email, setEmail] = useState("")
    const [open, setOpen] = useState(new Date().setHours(9, 0, 0));
    const [close, setClose] = useState(new Date().setHours(17, 0, 0));
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    const [editAble, setEditAble] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllData()).then(response =>
                setData(response.payload)
            )
        };
        fetchData();
    }, [dispatch]);
    console.log(data)

    useEffect(() => {
        if (data) {
            setName(data.name);
            setDes(data.description);
            setEmail(data.email);
            setOpen(new Date(0, 0, 0, data.open.split(':')[0], data.open.split(':')[1]))
            setClose(new Date(0, 0, 0, data.close.split(':')[0], data.close.split(':')[1]));
            setAddress(data.address || '')
            setPhoneNumber(data.phone_number || '')
        }
    }, [data, setName, setDes, setEmail, setOpen, setClose, setAddress, setPhoneNumber]);

    // ** Hooks
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const toggleEditAble = () => {
        setEditAble(!editAble)
    }

    const onSubmit = () => {
        const opentime = new Date(open)
        const openHours = opentime.getHours()
        const openMinute = opentime.getMinutes()
        const clinicOpen = openHours + ':' + openMinute
        const closetime = new Date(close)
        const closeHours = closetime.getHours()
        const closeMinute = closetime.getMinutes()
        const clinicClose = closeHours + ':' + closeMinute

        const newData = { name, des, email, clinicOpen, clinicClose, address, phoneNumber }
        console.log(newData)
        try {
            dispatch(updateClinic(newData))
            toast.success('แก้ไขข้อมูลคลินิกสำเร็จ')
            toggleEditAble()
        } catch (error) {
            console.log(error)
            toast.danger('เกิดข้อผิดพลาด')
        }
    }

    const handleEditClinic = async (event) => {
        event.preventDefault();
        return MySwal.fire({
            title: 'ยืนยันการแก้ไขข้อมูลคลินิกหรือไม่?',
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
                onSubmit(event)
            }
        })
    }


    return (
        <Fragment>
            <Card>
                <CardBody>
                    <div className="mb-2" style={{ marginBottom: '20px' }}>
                        <h2 className="mb-1"> ข้อมูลคลินิก</h2>
                    </div>
                    <Form onSubmit={handleEditClinic}>
                        <div className='mb-1'>
                            <Label className='form-label' for='clinicName'>
                                ชื่อคลินิก:
                            </Label>
                            <Input
                                id='clinicName'
                                name='clinicName'
                                placeholder="ชื่อคลินิก"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                invalid={name === '' && true}
                                disabled={!editAble}
                            />
                            {name === '' && <FormFeedback>{'กรุณากรอกชื่อคลินิก'}</FormFeedback>}
                        </div>
                        <div className='mb-1'>
                            <Label className='form-label' for='textarea-counter'>
                                คำอธิบายคลินิก
                            </Label>
                            <Input
                                id='description'
                                name='description'
                                value={des}
                                onChange={e => setDes(e.target.value)}
                                type='textarea'
                                placeholder='คำอธิบายคลินิก'
                                style={{ minHeight: '100px' }}
                                invalid={des === '' && true}
                                disabled={!editAble}
                            />
                            {des === '' && <FormFeedback>{'กรุณากรอกคำอธิบายคลินิก'}</FormFeedback>}
                        </div>

                        <div>
                            <Row>
                                <Col>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='phone-number'>
                                            เบอร์โทรติดต่อ
                                        </Label>
                                        <InputGroup className='input-group-merge'>
                                            <InputGroupText
                                                className={classnames({
                                                    'is-invalid': errors.phoneNo && true

                                                })}

                                            >
                                                TH (+66)
                                            </InputGroupText>
                                            <Cleave
                                                id='phoneNo'
                                                name='phoneNo'
                                                value={phoneNumber}
                                                onChange={e => setPhoneNumber(e.target.value)}
                                                placeholder='081 234 5678'
                                                className={classnames('form-control', {
                                                    'is-invalid': phoneNumber === null && true
                                                })}
                                                options={{ phone: true, phoneRegionCode: 'TH' }}
                                                disabled={!editAble}
                                            />
                                            {phoneNumber === '' && <FormFeedback>{'กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก'}</FormFeedback>}
                                        </InputGroup>
                                    </div>
                                </Col>
                                <Col>
                                    <Label className='form-label' for='phone-number'>
                                        อีเมล (กรอกหรือไม่ก็ได้)
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type='email'
                                        placeholder='clinic@email.com'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        disabled={!editAble}
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div className="mb-1">
                            <Row>
                                <Col>
                                    <Label className='form-label' for='open'>
                                        เวลาเปิดทำการ
                                    </Label>
                                    <Flatpickr
                                        name="open"
                                        id="open"
                                        value={open}
                                        onChange={time => setOpen(time)}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'H:i',
                                            time_24hr: true,
                                            utc: '+07:00',
                                            locale: Thai,
                                            disableMobile: true
                                        }}
                                        className={classnames('form-control', {
                                            'is-invalid': errors.close && true
                                        })}
                                        disabled={!editAble}
                                    />
                                </Col>
                                <Col>
                                    <Label className='form-label' for='close'>
                                        เวลาปิดทำการ
                                    </Label>
                                    <Flatpickr
                                        name="close"
                                        id="close"
                                        value={close}
                                        onChange={time => setClose(time)}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'H:i',
                                            time_24hr: true,
                                            utc: '+07:00',
                                            locale: Thai,
                                            disableMobile: true
                                        }}
                                        className={classnames('form-control', {
                                            'is-invalid': errors.close && true
                                        })}
                                        disabled={!editAble}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className='mb-1'>
                            <Label className='form-label' for='textarea-counter'>
                                ข้อมูลที่อยู่ / สถานที่ตั้ง
                            </Label>
                            <Input
                                id='description'
                                name='description'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                type='textarea'
                                placeholder='ที่อยู่คลินิก'
                                style={{ minHeight: '100px' }}
                                invalid={address === '' && true}
                                disabled={!editAble}
                            />
                            {des === '' && <FormFeedback>{'กรุณากรอกคำอธิบายคลินิก'}</FormFeedback>}
                        </div>


                        <div className='d-flex'>
                            {!editAble ?
                                <Button className='me-1' color='primary' onClick={toggleEditAble}>
                                    แก้ไขข้อมูลตลินิก
                                </Button>
                                :
                                <div>
                                    <Button className='me-1' color='primary' onClick={toggleEditAble}>
                                        ยกเลิก
                                    </Button>
                                    <Button className='me-1' color='primary' type="submit">
                                        บันทึก
                                    </Button>
                                </div>

                            }
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>

    )
}
export default Info
