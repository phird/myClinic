// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'


const PreviewCard = ({ data, details }) => {
  console.log("in PreviewCard Data : ")
  console.log(data)
  console.log(details)
  const totalPrice = details.reduce((acc, detail) => acc + detail.price, 0);
  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
              <h3 className='text-primary invoice-logo'>ใบเสร็จค่ารักษา</h3>
            </div>
            <CardText className='mb-25'>ที่อยู่: </CardText>
            <CardText className='mb-25'> อำเภอ  ตำบล  จังหวัด </CardText>
            <CardText className='mb-0'>  เบอร์โทรติดต่อ  </CardText>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              <span className='invoice-number'>#{data.invID}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              {/* <p className='invoice-date-title'>Date Issued:</p>
              <p className='invoice-date'>{data.invoice.issuedDate}</p>*/}
            </div>
            <div className='invoice-date-wrapper'>
              {/*               <p className='invoice-date-title'>Due Date:</p>
              <p className='invoice-date'>{data.invoice.dueDate}</p> */}
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className='invoice-spacing' />

      {/* Address and Contact */}
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0 mt-xl-0 mt-2' xl='8'>
            <h6 className='mb-2'>ลูกค้า:</h6>
            <h6 className='mb-25'>ชื่อ: {data.fname}  {data.lname} </h6>
            <CardText className='mb-25'>ที่อยู่: {data.address} </CardText>
            <CardText className='mb-25'>ตำบล: {data.subdistrict} อำเภอ: {data.district}  จังหวัด: {data.province}  </CardText>
            <CardText className='mb-25'>{data.postalCode}</CardText>
            <CardText className='mb-25'>เบอร์โทร: {data.phoneNo}</CardText>
            <CardText className='mb-0'></CardText>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}
      <Table responsive>
        <thead>
          <tr>
            <th className='py-1'>รายการ</th>
            <th className='py-1'>ราคา</th>
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
                <span className='fw-bold'>{detail.price}</span>
              </td>
              <td className='py-1'>
                <span className='fw-bold'>{detail.price}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
           <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
            <CardText className='mb-0'>
             {/*  <span className='fw-bold'>ผู้ออกใบเสร็จ:</span> <span className='ms-75'> Alfie Solomons </span> */}
            </CardText>
          </Col> 
          <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
            <div className='invoice-total-wrapper'>
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>ยอดรวม:</p>
                <p className='invoice-total-amount'>{totalPrice} บาท</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      <hr className='invoice-spacing' />

      {/* Invoice Note */}
      <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span className='fw-bold'>### </span>
            <span>
              ขอขอบคุณ
            </span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  ) : null
}

export default PreviewCard
