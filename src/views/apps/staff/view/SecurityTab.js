// ** React Imports
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Alert,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from 'reactstrap'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Third Party Components
import * as yup from 'yup'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Lock } from 'react-feather'
import { toast } from 'react-hot-toast'

// * Store Imports
import { updatePassword } from '../store'

const SignupSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน')
})
const defaultValues = {
  password: '',
  confirmPassword: '',
}

const SecurityTab = ({ staffRole, staffID, selectedStaff }) => {
  

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    /* trigger() */
    const userID = staffID
    const newPassword = data.password
    const newData = [userID, newPassword]
    dispatch(updatePassword( newData ))
    toast.success('อัพเดตรหัสผ่านสำเร็จ')
  }
  return (
    <Fragment>
      <Card>
        <CardHeader>
          {selectedStaff == 1 ? (
            <div>
              <CardTitle tag='h4'><Lock size={16}/>  ตั้งรหัสรหัสผ่าน</CardTitle>
            </div>) :
            (
              <CardTitle tag='h4'><Lock size={16}/>   เปลี่ยนรหัสผ่าน</CardTitle>
            )
          }
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Alert color='warning' className='mb-2'>
              <div className='alert-body'>รหัสผ่านอย่างน้อย 8 ตัว</div>
            </Alert>
            <Row>
              <Col className='mb-2' md={6}>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      label={selectedStaff == 1 ? 'รหัสผ่านใหม่' : 'รหัสผ่านใหม่'}
                      htmlFor='password'
                      className='input-group-merge'
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password && <FormFeedback className='d-block'>{errors.password.message}</FormFeedback>}
              </Col>
              <Col className='mb-2' md={6}>
                <Controller
                  control={control}
                  id='confirmPassword'
                  name='confirmPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='ยืนยันรหัสผ่าน'
                      htmlFor='confirmPassword'
                      className='input-group-merge'
                      invalid={errors.confirmPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormFeedback className='d-block'>{errors.confirmPassword.message}</FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                {selectedStaff == 1 ? (
                  <div>
                    <Button type='submit' color='primary'>
                      ตั้งรหัสผ่าน
                    </Button>
                  </div>) :
                  (
                    <Button type='submit' color='primary'>
                      เปลี่ยนรหัสผ่าน
                    </Button>
                  )
                }
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default SecurityTab
