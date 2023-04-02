// ** React Imports
import { Fragment, useContext } from 'react'

import { useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

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
    const [number , setNumber] = useState(0)
    const [name , setName]  = useState([])
    const data = encounterData


    console.log("here was data[0]")
    console.log(data)
    useEffect(()=>{
        if(data.length > 0 ){
            setNumber(data.length)
            setName(data[0].fname + " " + data[0].lname )
        }
        
    },[data])

    return (
        <Row>
            {/* Stats With Icons Horizontal */}
            <Col lg='4' sm='6'>
                <StatsHorizontal icon={<CheckCircle size={21} />} color='primary' stats={number} statTitle='จำนวนคนไข้ที่ทำการตรวจ' />
            </Col>
            <Col lg='4' sm='6'>
                <StatsHorizontal icon={<UserCheck size={21} />} color='success' stats={!name ? name : `-`} statTitle='คนไข้ที่ทำการตรวจล่าสุด' />
            </Col>
            <Col lg='4' sm='6'>
                <StatsHorizontal icon={<Calendar size={21} />} color='danger' stats=' - ' statTitle='การนัดหมายครั้งต่อไป' />
            </Col>
            {/* Stats With Icons Horizontal */}
        </Row>
    )
}


export default UserStat