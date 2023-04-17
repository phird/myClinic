
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
import { getWidgetEncounter, getDoctorForUser} from '../../encounter/store'

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
    console.log(selectedPatientID)

    let latestDate = new Date(store.widgetData?.latest_encounter_date || ' - ')
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Bangkok' };
    const thaiDateString = latestDate.toLocaleDateString('th-TH', options);

    // ** State
    const [doctorList, setDoctorList] = useState([''])
    const [latestDoctor, setLatestDoctor] = useState('-'); //
    const [data, setData] = useState([])
    const [staffID, setStaffID] = useState(0);
    // ** Context
    useEffect(() => {
        dispatch(getDoctorForUser())
        dispatch(getWidgetEncounter(selectedPatientID))
    }, [dispatch, selectedPatientID]);

    useEffect(()=>{
        setDoctorList(store.doctorList)
        setData(store.widgetData)
    },[dispatch, store.widgetData])


    useEffect(() => {
        const findDoc = (id) => {
            let firstName = '';
            let lastName = '';
            doctorList.forEach((doctor) => {
                if (doctor.staffID === id) {
                    if (doctor.fname != undefined && doctor.lname != undefined) {
                        firstName = '-'
                        lastName = ''
                    }
                    firstName = doctor.fname
                    lastName = doctor.lname
                }
            });
            let doctorName = firstName + ' ' + lastName
            console.log("Doctor Name")
            console.log(doctorName)
            if (id != 0 && doctorName != undefined) {
                setLatestDoctor(doctorName)
            } else {
                setLatestDoctor('-')
            }
        };
        if(data){
            findDoc(data.staffID)
        }else{
            setLatestDoctor('-')
        }
    }, [data])





    return (
        <Fragment>
            <Row>
                <Col xl='12' md='12' sm='12'>
                    {thaiDateString === 'Invalid Date' ?
                        <StatsVertical icon={<CheckSquare size={21} />} color='primary' stats='-' statTitle='ครั้งล่าสุดที่มา' /> :
                        <StatsVertical icon={<CheckSquare size={21} />} color='primary' stats={`${thaiDateString}`} statTitle='ครั้งล่าสุดที่มา' />
                    }
                </Col>
            </Row>
            <Row>
                <Col xl='12' md='12' sm='12'>
                    {latestDoctor === 'undefined undefined' ? <StatsVertical icon={<UserCheck size={21} />} color='danger' stats='-' statTitle='หมอคนที่ตรวจล่าสุด' />
                        : <StatsVertical icon={<UserCheck size={21} />} color='danger' stats={latestDoctor} statTitle='หมอคนที่ตรวจล่าสุด' />
                    }
                </Col>
            </Row>

        </Fragment>
    )
}

export default StatUserCard
