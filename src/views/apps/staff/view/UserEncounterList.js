// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** React Imports 
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Label Images
import xdLabel from '@src/assets/images/icons/brands/xd-label.png'
import vueLabel from '@src/assets/images/icons/brands/vue-label.png'
import htmlLabel from '@src/assets/images/icons/brands/html-label.png'
import reactLabel from '@src/assets/images/icons/brands/react-label.png'
import sketchLabel from '@src/assets/images/icons/brands/sketch-label.png'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Store 
import { getEncounterStaff } from '../store'


export const columns = [
  {
    name: 'รหัสการรักษา',
    selector: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/encounter/view/${row.encounterID}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>#ENC-{row.encounterID}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'ชื่อผู้ป่วย',
    minWidth: '300px',
    selector: row => row.patientID,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>

        <div className='d-flex flex-column'>
          <Link
            to={`/apps/patient/view/${row.patientID}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{row.fname + ' ' + row.lname}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'วันที่ทำการตรวจ',
    minWidth: '138px',
    selector: row => row.editDate,
    cell: row => {
      const date = new Date(row.addedDate)
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'Asia/Bangkok' };
      const thaiDateString = date.toLocaleDateString('th-TH', options);

      return (
        <span className='text-capitalize'>
          {thaiDateString}
        </span>
      )
    }
  },
]

const UserEncountersList = () => {
  const dispatch = useDispatch()
  // ** Hooks 
  const id = useParams()
  // ** get data
  const store = useSelector(state => state.staff)
  useEffect(() => {
    dispatch(getEncounterStaff(parseInt(id.id)))
  }, [store.selectedStaff.length])

  return (
    <Card>
      <CardHeader tag='h4'>ข้อมูลการตรวจล่าสุด</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={store.encounterStaff}
          className='react-dataTable'
          /* sortIcon={<ChevronDown size={10} />} */
        />
      </div>
    </Card>
  )
}


export default UserEncountersList