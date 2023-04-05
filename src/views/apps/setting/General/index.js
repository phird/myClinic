// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// ** Third Party 
import Breadcrumbs from '@components/breadcrumbs'
import { Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

// ** Store & Action
import { getAllData } from './store'

// ** Component
import Clinic from './Clinic'
import Info from './Info'


const GeneralSetting = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.clinic)

    // ** state
    const [clinic, setClinic] = useState([])
    console.log(clinic)

    useEffect(() => {
        dispatch(getAllData())
    }, [])

    useEffect(() => {
        setClinic(store.allData)
    }, [store.allData])

    return (
        <Fragment>
            <Breadcrumbs title='ตั้งค่าข้อมูลคลินิก' data={[{ title: 'ตั้งค่า' }, { title: 'ข้อมูลคลินิก' }]} />
            {clinic == [] ?
                <div>
                    <Clinic />
                </div>
                : <div>
                    <Info data={clinic} />
                </div>}
        </Fragment>
    )

}


export default GeneralSetting