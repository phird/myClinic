// ** Reactstrap Imports
import { Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormFeedback, Label, Input, InputGroup, InputGroupText } from 'reactstrap'
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
// ** Images
import trialSvg from '@src/assets/images/illustration/pricing-Illustration.svg'

//* Third-Party Components 
import * as yup from 'yup'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import Cleave from 'cleave.js/react'
import classnames from 'classnames'
import MapContainer from './MapContainer';


// ** Import Style 
import '@styles/react/libs/react-select/_react-select.scss'
import 'flatpickr/dist/themes/dark.css';
import '@styles/react/libs/flatpickr/flatpickr.scss'


// * Store & Actions 
const MySwal = withReactContent(Swal)

// ** Component 
import IntModal from './modal/modalInitial'


const Initial = () => {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <div className='pricing-free-trial'>
      <Row>
        <Col className='mx-auto' lg={{ size: 10, offset: 3 }} sm='12'>
          <div className='pricing-trial-content d-flex justify-content-between'>
            <div className='text-center text-md-start mt-3'>
              <h3 className='text-primary'>ดูเหมือนท่านยังยังไม่มีข้อมูลคลินิก!</h3>
              <h5>กด เพิ่มข้อมูลคลินิก เพื่อเพิ่มข้อมูลคลินิก 🏥 </h5>
              <div className='mt-2 mt-lg-3'>
                <Button onClick={toggleModal} color='primary'>เพิ่มข้อมูลคลินิก</Button>
              </div>
            </div>
            <img
              className='pricing-trial-img img-fluid'
              src={trialSvg}
              alt='trial svg'
              style={{
                transform: 'scaleX(1)'
              }}
            />
          </div>
        </Col>
      </Row>
      <IntModal openModal={modalOpen} toggleModal={toggleModal} />

    </div>
  )
}
export default Initial
