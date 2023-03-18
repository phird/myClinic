// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, Alert,Button } from 'reactstrap'

import { ChevronLeft } from 'react-feather'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

// ** Store
import { getInvoiceDetail, getInvoiceList, getInvoicePrescription } from '../store'

const InvoicePreview = () => {
  // ** HooksVars
  const { id } = useParams()
  const dispatch = useDispatch()

  const store = useSelector(state => state.invoice)
  console.log("store")
  console.log(store)
  // ** States
  const [data, setData] = useState([])
  const selectedInvoice = store.detail;
  const prescriptionDetail = store.invoicePrescription
  // ** Functions to toggle add & send sidebar

  // ** Get invoice & invoiceList on mount based on id
  useEffect(() => {
    dispatch(getInvoiceDetail(id))
    dispatch(getInvoiceList(id))
    dispatch(getInvoicePrescription(id))
  }, [dispatch, id])

  useEffect(() => {
    setData(selectedInvoice)
  }, [selectedInvoice])

  const navigate = useNavigate()
  // ** Handles Label Update
  const handleGoBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return data !== null && store.expenseList !== undefined ? (
    <div className='invoice-preview-wrapper'>
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
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard data={data} details={store.expenseList} prescriptionData={store.invoicePrescription} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions id={id} data={data} details={store.expenseList} prescriptionData={store.invoicePrescription} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>ไม่เจอใบเสร็จค่ารักษา</h4>
      <div className='alert-body'>
      </div>
    </Alert>
  )
}

export default InvoicePreview
