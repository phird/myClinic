// ** React Imports
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Download,
  File,

} from 'react-feather'

// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.epID,
    cell: row => <Link className='fw-bolder' to={`/apps/encounter/view/${row.epID}`}>#ENC{row.epID}</Link>
  },
  {
    name: 'วันที่ทำการตรวจ',
    sortable: true,
    minWidth: '150px',
    sortField: 'total',
    selector: row => row.addedDate,
    cell: row => <span>{dateFormat(row.addedDate, "dd/mm/yyyy") || 0}</span>
  },
  {
    minWidth: '200px',
    name: 'ยาที่สั่ง',
    cell: row => <Link>
      ดูรายการยา
    </Link>
  },
  {
    name: 'เมนู',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <>
          <Link className='text-body' to={`/apps/invoice/preview/${row.encounterID}`} id={`pw-tooltip-${row.encounterID}`}>
            <File size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.encounterID}`}>
            ดูค่ารักษา
          </UncontrolledTooltip>
        </>

        <>
          <Download className='text-body cursor-pointer' size={17} id={`download-tooltip-${row.encounterID}`} />
          <UncontrolledTooltip placement='top' target={`download-tooltip-${row.encounterID}`}>
            ดาวน์โหลดค่ารักษา
          </UncontrolledTooltip>
        </>



      </div>
    )
  }
]
