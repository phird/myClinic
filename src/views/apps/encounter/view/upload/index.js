// ** Data List Component
import Table from './Table'

// ** Style 
import '@styles/react/apps/app-users.scss'

import Breadcrumbs from '@components/breadcrumbs'

const UploadList = () => {
    return (
        <div className='app-user-list'>
            <Breadcrumbs
                title='อัพโหลดรูปภาพ'
                data={[{ title: 'ตรวจผู้ป่วย' }, { title: 'อัพโหลดรูปภาพ' }]}
            />
            <Table/>
        </div>
    )

}

export default UploadList