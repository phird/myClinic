// ** React Imports
import { Fragment, useContext } from 'react'

import { useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'

// ** Utils
import { kFormatter } from '@utils'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

import {
    CheckCircle,
    UserCheck,
    Calendar,
  } from 'react-feather'
  
const UserStat = ({ encounterData }) => {
    const [noEn , setNoEn] = useState('')
    const [name , setName]  = useState('')
    const [enID , setEnID] = useState()
    const data = encounterData

    console.log("here is encounterData in UserStat ")
    console.log(encounterData)

    console.log("here was data[0]")
    console.log(data)
    useEffect(()=>{
        if(data.length > 0 ){
            setNoEn(data.length)
            setName(data[0].fname + " " + data[0].lname )
            setEnID(data[0].encounterID)
        }else{
            setName('-');
            setEnID();
            setNoEn('0');
        }
        
    },[data, encounterData])

    return (
        <Row>
            {/* Stats With Icons Horizontal */}
            <Col lg='4' sm='6'>
                <StatsHorizontal icon={<CheckCircle size={21} />} color='primary' stats={noEn} statTitle='จำนวนคนไข้ที่ทำการตรวจเสร็จสิ้น' />
            </Col>
            <Col lg='4' sm='6'>
            <Link  to={`/apps/encounter/view/${enID}`} className='text-body'>
                <StatsHorizontal icon={<UserCheck size={21} />} color='success' stats= {name} statTitle='คนไข้ที่ทำการตรวจล่าสุด' />
            </Link>
            </Col>
            <Col lg='4' sm='6'>
                <StatsHorizontal icon={<Calendar size={21} />} color='danger' stats=' - ' statTitle='การนัดหมายครั้งต่อไป' />
            </Col>
            {/* Stats With Icons Horizontal */}
        </Row>
    )
}


export default UserStat