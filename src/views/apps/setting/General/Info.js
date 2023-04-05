import { Fragment, useState } from "react"
import { useEffect } from "react"

import { Card, CardBody, CardHeader, Row, Col } from "reactstrap"


const Info = ({ data = [] }) => {
    console.log("in INFO")
    console.log(data[0])
    const [clinic, setClinic] = useState({})
    useEffect(()=>{
        setClinic(data[0] || {})
    },[data])

    console.log("Here a Clinic Data")
    console.log(clinic)

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <div className="mb-2" style={{ marginBottom: '20px' }}>
                        <h2 className="mb-1"> ข้อมูลคลินิก</h2>
                    </div>
                    <Row md={12} xs={12}   >
                        <p>ชื่อคลินิก: {clinic.name || 'N/A'}</p>
                    </Row>
                    <Row md={12} xs={12}  >
                        <p>เวลาทำการ: {clinic.hours_of_operation || 'N/A'}</p>
                    </Row>
                    <Row md={12} xs={12}   >
                        <p>คำอธิบาย: {clinic.description || 'N/A'}</p>
                    </Row>
                    <Row md={12} xs={12}   >
                        <p>เบอร์โทรติดต่อ: {clinic.phone_number || 'N/A'}</p>
                    </Row>
                    <Row md={12} xs={12}   >
                        <p>ที่อยู่: {clinic.address || 'N/A'}</p>
                    </Row>

                </CardBody>
            </Card>
        </Fragment>

    )
}
export default Info
