// ** React Imports
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
// ** Reactstrap Imports
import { UncontrolledTooltip, Badge } from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Download,
  File,
} from 'react-feather'

import { getWidgetEncounter } from '../../encounter/store'

// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'encounterID',
    minWidth: '107px',
    selector: row => row.encounterID,
    cell: row => <Link className='fw-bolder' 
      to={`/apps/encounter/view/${row.encounterID}` }
      >#ENC{row.encounterID}</Link>
  },
  {
    name: 'วันที่ทำการตรวจ',
    sortable: true,
    minWidth: '150px',
    sortField: 'addedDate',
    selector: row => row.addedDate,
    cell: row => <span>{dateFormat(row.addedDate, "dd/mm/yyyy") || 0}</span>
  },
  {
    name: 'สถานะการตรวจ',
    minWidth: '138px',
    sortable: true,
    sortField: 'eStatus',
    selector: row => row.eStatus,
    cell: row => <span className='text-capitalize'>{
      row.eStatus == 0 ? (
        <Badge color='success'>
          ตรวจเสร็จสิ้น
        </Badge>) : (
        <Badge color='danger'>
          ยังไม่ได้ทำการตรวจ
        </Badge>)}</span>
  },
  {
    name: 'ยา',
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.prescriptionID,
    cell: row => <span className='text-capitalize'>{
      row.eStatus == 0 ? (
        <Link >
          ดูรายการยา
        </Link> ): (
        <></>)}</span>
  },
  {
    name: 'เมนู',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <>
          <Link className='text-body' to={`/apps/invoice/preview/${row.invID}`} id={`pw-tooltip-${row.encounterID}`}>
            <File size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.encounterID}`}>
            ดูค่ารักษา
          </UncontrolledTooltip>
        </>
        
        <>
          <Link className='text-body' to={`/apps/invoice/preview/${row.invID}`} id={`pw-tooltip-${row.encounterID}`}>
            <Download className='text-body cursor-pointer' size={17} id={`download-tooltip-${row.encounterID}`} tag={Link}/>
          </Link>
          <UncontrolledTooltip placement='top' target={`download-tooltip-${row.encounterID}`}>
            ดาวน์โหลดค่ารักษา
          </UncontrolledTooltip>
        </>



      </div>
    )
  }
]
