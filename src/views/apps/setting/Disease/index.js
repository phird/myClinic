// ** User List Component
import Table from './DiseaseList'

// ** Styles
import '@styles/react/apps/app-users.scss'

// ** React Imports
import { Fragment } from 'react'


// * Third Party Component 
import Breadcrumbs from '@components/breadcrumbs'





const DiseaseSetting = () => {

    return (
        <div className='app-user-list'>
            <Breadcrumbs title='ตั้งค่าข้อมูลโรคที่พบบ่อย' data={[{ title: 'ตั้งค่า' }, { title: 'ข้อมูลโรค' }]} />
            <Table />
        </div>

    )

}


export default DiseaseSetting