// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// ** Reactstrap Imports
import { Row, Col, Table } from 'reactstrap'

// ** Store
import { getInvoiceDetail, getInvoiceList, getInvoicePrescription } from '../store'

// ** Styles
import '@styles/base/pages/app-invoice-print.scss'

const Print = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)
  console.log("store")
  console.log(store)
  // ** States
  const [data, setData] = useState([])
  const [prescriptionData, setPrescriptionData] = useState([])
  const selectedInvoice = store.detail;
  
  // ** Get invoice & invoiceList on mount based on id
  useEffect(() => {
    dispatch(getInvoiceDetail(id))
    dispatch(getInvoiceList(id))
    dispatch(getInvoicePrescription(id))
  }, [dispatch, id])

  useEffect(() => {
    setData(selectedInvoice)
    setPrescriptionData(store.invoicePrescription)
  }, [selectedInvoice, store.invoicePrescription])

  
  const details = store.expenseList
  const totalServicePrice = details.reduce((acc, detail) => acc + detail.price, 0);
  const totalDrugPrice = prescriptionData.reduce((acc, detail) => acc + (detail.drugPrice*detail.quantity), 0);
  const sum = (totalDrugPrice + totalServicePrice).toLocaleString()
  // ** Print on mount
  useEffect(() => {
    setTimeout(() => window.print(), 50)
  }, [])

  return (
    <div className='invoice-print p-3'>
      <div className='d-flex justify-content-between flex-md-row flex-column pb-2'>
        <div>
          <div className='d-flex mb-1'>
            <h3 className='text-primary fw-bold ms-1'>ใบเสร็จค่ารักษา</h3>
          </div>
          <p className='mb-25'> คลินิกแพทย์แผนไทย</p>
          <p className='mb-25'>ที่อยู่ 100/10</p>
          <p className='mb-25'>ตำบล สุเทพ อำเภอ เมืองเชียงใหม่ จังหวัด เชียงใหม่ 50200</p>
          <p className='mb-0'>เบอร์โทรติดต่อ 089-5523123</p>
        </div>
        <div className='mt-md-0 mt-2'>
          <h4 className='fw-bold text-end mb-1'>#{data.invID}</h4>
          <div className='invoice-date-wrapper mb-50'>
            {/* <span className='invoice-date-title'>Date Issued:</span>
            <span className='fw-bold'> 25/08/2020</span> */}
          </div>
          <div className='invoice-date-wrapper'>
            {/* <span className='invoice-date-title'>Due Date:</span>
            <span className='fw-bold'>29/08/2020</span> */}
          </div>
        </div>
      </div>

      <hr className='my-2' />

      <Row className='pb-2'>
        <Col sm='6'>
          <h6 className='mb-1'>ลูกค้า:</h6>
          <p className='mb-25'>ชื่อ: {data.fname}  {data.lname} </p>
          <p className='mb-25'>ที่อยู่: {data.address} </p>
          <p className='mb-25'>ตำบล: {data.subdistrict} อำเภอ: {data.district}  จังหวัด: {data.province}  </p>
          <p className='mb-25'>{data.postalCode}</p>
          <p className='mb-25'>เบอร์โทร: {data.phoneNo}</p>
          <p className='mb-0'>{/* peakyFBlinders@gmail.com */}</p>
        </Col>
      </Row>

      <Table className='mt-2 mb-0' responsive>

        <thead>
          <tr>
            <th className='py-1'>รายการ</th>
            <th className='py-1'></th>
            <th className='py-1'></th>
            <th className='py-1'>รวม</th>
          </tr>
        </thead>
        <tbody>
          {details.map(detail => (
            <tr key={detail.invLID}>
              <td className='py-1'>
                <p className='card-text fw-bold mb-25'>{detail.expenseName}</p>
              </td>
              <td className='py-1'>
              </td>
              <td className='py-1'>
              </td>
              <td className='py-1'>
                <span className='fw-bold'>{(detail.price).toLocaleString() + ' ' + 'บาท'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* for prescription */}
      
        <Table className='mt-2 mb-0' responsive>
          <thead>
            <tr>
              <th className='py-1 fw-bolderer'>รายการยา</th>
              <th className='py-1'>ราคา</th>
              <th className='py-1'>จำนวน</th>
              <th className='py-1'>รวม</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData.map(drug => (
              <tr key={drug.drugID}>
                <td className='py-1'>
                  <p className='card-text fw-bold mb-25'>{drug.drugName}</p>
                </td>
                <td className='py-1'>
                  <span className='fw-bold'>{(drug.drugPrice).toLocaleString() + ' ' + 'บาท'}</span>
                </td>
                <td className='py-1'>
                  <span className='fw-bold'>{(drug.quantity).toLocaleString() + ' ' + drug.unit}</span>
                </td>
                <td className='py-1'>
                  <span className='fw-bold'>{(drug.drugPrice * drug.quantity).toLocaleString() + ' ' + 'บาท'}</span>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>

      <Row className='invoice-sales-total-wrapper mt-3'>
        <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
          <p className='mb-0'>
            {/* <span className='fw-bold'>ผู้ออกใบเสร็จ:</span> <span className='ms-75'> Alfie Solomons </span> */}
          </p>
        </Col>
        <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
          <div className='invoice-total-wrapper'>
            <hr className='my-50' />
            <div className='invoice-total-item'>
              <p className='invoice-total-title'>ยอดรวม:</p>
              <p className='invoice-total-amount'>{sum} บาทถ้วน</p>
            </div>
          </div>
        </Col>
      </Row>

      <hr className='my-2' />

      <Row>
        <Col sm='12'>
          <span className='fw-bold'>### </span>
          <span>
            ขอขอบคุณ
          </span>
        </Col>
      </Row>
    </div>
  )
}

export default Print
