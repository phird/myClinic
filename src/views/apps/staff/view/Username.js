// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Form,
    Table,
    Alert,
    Input,
    Modal,
    Button,
    CardBody,
    CardTitle,
    ModalBody,
    CardHeader,
    ModalHeader,
    FormFeedback,
    Label,
    Badge,
} from 'reactstrap'


// ** Third Party Components
import * as yup from 'yup'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Lock, Edit, Trash, Settings, MessageSquare, ChevronRight, Shield, User } from 'react-feather'
import Select from 'react-select'
import classnames from 'classnames'
import { useToaster, toast } from 'react-hot-toast'


// ** Store 
import { updateUsername } from '../store'
import { getStaffData } from '../store'

function SetUsername({ staffID, staffUsername }) {
    const dispatch = useDispatch()
    const UsernameSchema = yup.object().shape({
        username: yup.string().min(4).required(),
    })


    const onSubmit = data => {
        const newData = [staffID, data.username]
        dispatch(updateUsername(newData))
        toast.success("กำหนดชื่อผู้ใช้สำเร็จ")
        dispatch(getStaffData(staffID))
    }
    // ** Hooks
    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(UsernameSchema) })


    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'> <User size={16} />  ชื่อผู้ใช้</CardTitle>
                </CardHeader>
                <CardBody>
                    <h4> ชื่อผู้ใช้ปัจจุบัน: <Badge color={staffUsername == null ? 'light-danger' : 'light-primary'}> {staffUsername == null ? 'ยังไม่ได้กำหนด' : staffUsername} </Badge>  </h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col className='mb-2' md={6}>
                                <div className='mb-1'>
                                    <Label className='form-label' for='username'>
                                        ชื่อผู้ใข้
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='username'
                                        name='username'
                                        render={({ field }) => <Input placeholder='ชื่อผู้ใช้ (ภาษาอังกฤษ)' invalid={errors.username && true} {...field} />}
                                    />
                                    {errors.username && <FormFeedback>{"กรอกชื่อผู้ใช้ที่มีความยาวอย่างน้อย 4 ตัว"}</FormFeedback>}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <Button type='submit' color='primary'>
                                    ยืนยัน
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>
    )
}


export default SetUsername