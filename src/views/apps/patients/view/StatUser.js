
// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
// ** Reactstrap Imports
import { Row, Col, Card, CardBody } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Custom Components
import StatsVertical from '@components/widgets/stats/StatsVertical'

//** Store  */
import { getWidgetEncounter } from '../../encounter/store'

// ** Icons Imports
import {
    Eye,
    Heart,
    ShoppingBag,
    MessageSquare,
    UserCheck,
    CheckSquare
} from 'react-feather'


const StatUserCard = ({ selectedPatient }) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.encounters)
    const selectedPatientID = selectedPatient.patientID

    const latestDate = new Date(store.widgetData?.latest_encounter_date || ' - ')
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Bangkok' };
    const thaiDateString = latestDate?.toLocaleDateString('th-TH', options) || ' - ';


    // ** State
    const [latestSymp, setLatestSymp] = useState([]);
    const [latestDoctor, setLastestDoctor] = useState(); // ** Need to create doctor table !!!!

    // ** Context
    useEffect(() => {
        dispatch(getWidgetEncounter(selectedPatientID))
    }, [dispatch, selectedPatientID]);
    console.log(store, dispatch, selectedPatient)
    return (
        <Fragment>
            <Row>
                {/* <Col xl='6' md='12' sm='12'>
                    <Card style={{maxHeight: '100%'}}>
                        <CardBody>
                            Hello World
                        </CardBody>
                    </Card>
                </Col> */}
                <Col xl='12' md='12' sm='12'>
                    {thaiDateString === 'Invalid Date' ?
                        <StatsVertical icon={<CheckSquare size={21} />} color='primary' stats={'-'} statTitle='ครั้งล่าสุดที่มา' /> :
                        <StatsVertical icon={<CheckSquare size={21} />} color='primary' stats={`${thaiDateString}`} statTitle='ครั้งล่าสุดที่มา' />
                    }

                </Col>
            </Row>
            <Row>
                <Col xl='6' md='6' sm='6'>
                    <StatsVertical icon={<Eye size={21} />} color='info' stats={`${store.encounter.length}`} statTitle='จำนวนการตรวจทั้งหมด' />
                </Col>
                <Col xl='6' md='6' sm='6'>
                    <StatsVertical icon={<UserCheck size={21} />} color='danger' stats={`ชื่อ: ${store.widgetData?.staffID || '-'}`} statTitle='หมอคนที่ตรวจล่าสุด' />
                </Col>
            </Row>

        </Fragment>
    )
}

export default StatUserCard
