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
import { Lock, Edit, Trash, Settings, MessageSquare, ChevronRight, Shield } from 'react-feather'
import Select from 'react-select'
import classnames from 'classnames'
import { useToaster ,toast } from 'react-hot-toast'

// * Store Imports
import { getAllData } from '../../setting/Role/Store'
import { updateRole } from '../store'

const RoleColorList = {
    ผู้ดูแล: 'light-primary',
    ทั่วไป: 'light-info'
}

const defaultValues = {
    permissionSelect: null
}

const RolePermission = ({ staffID, staffRole }) => {
    const dispatch = useDispatch();
    const roleID = staffRole;
    // ** Hooks
    const [roleList, setRoleList] = useState([]);
    const [role, setRole] = useState();

    useEffect(() => {
        const fetchRoleData = async () => {
            const role_data = await dispatch(getAllData())
            role_data.payload.forEach(role => {
                setRoleList(prevRole => [...prevRole, { label: role.name, value: role.roleID }])
            });
            role_data.payload.forEach(role => {
                if (role.value == roleID) {
                    setRole(role)
                }
            })
        };
        fetchRoleData()
    }, [])



    const getRoleName = (id) => {
        const currentRole = roleList.find(role => role.value === id);
        return currentRole ? currentRole.label : '';
    };

    const {
        control,
        trigger,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

 
    const onSubmitRole = (data) => {
        setPermission(data);
        const selected = data.RoleSelected.value;
        const newData = [staffID, selected];
        console.log(newData);
        dispatch(updateRole(newData));
        window.location.reload()
    }


    // * state 
    const [permission, setPermission] = useState(null);

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'> <Shield size={16} />  บทบาท</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmitRole)}>
                        <Alert color='warning' className='mb-2'>
                            <div className='alert-body'> กรุณาตรวจสอบบทบาทให้ครบถ้วน </div>
                        </Alert>
                        <Row>
                            <Col className='mb-2' md={6}>
                                <h4> บทบาทปัจจุบัน: <Badge color={RoleColorList[getRoleName(roleID)]} > {getRoleName(roleID)} </Badge>  </h4>
                                <Label className='form-label' for='react-select'>
                                    กำหนดบทบาทใหม่
                                </Label>
                                <Controller
                                    id='react-select'
                                    control={control}
                                    name='RoleSelected'
                                    render={({ field }) => (
                                        <Select
                                            /* isClearable */
                                            defaultValue={role}
                                            options={roleList}
                                            placeholder={'เลิอกบทบาท'}
                                            classNamePrefix='select'
                                            className={classnames('react-select', { 'is-invalid': permission !== null && permission.RoleSelected === null })}
                                            {...field}
                                        />
                                    )}
                                />
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


export default RolePermission