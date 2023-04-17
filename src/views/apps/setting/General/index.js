// ** React Imports
import { Fragment} from 'react'

// ** Third Party 
import Breadcrumbs from '@components/breadcrumbs'


// ** Component

import Page from './page'
const GeneralSetting = () => {
    return (
        <Fragment>
            <Breadcrumbs title='ตั้งค่าข้อมูลคลินิก' data={[{ title: 'ตั้งค่า' }, { title: 'ข้อมูลคลินิก' }]} />
            <Page/>
        </Fragment>
    )
}
export default GeneralSetting