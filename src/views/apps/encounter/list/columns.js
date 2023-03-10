// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { store } from '@store/store'
import { getAllEncounter, deleteEncounter, } from '../store'

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive, Camera } from 'react-feather'

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  UncontrolledTooltip,
  Badge
} from 'reactstrap'

//** dateFormat imports */
import dateFormat from 'dateformat'


export const columns = [
  {
    name: 'รหัสการรักษา',
    minWidth: '50px',
    sortField: 'id',
    selector: row => row.encounterID,
    cell: row => (
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
    sortField: 'fullName',
    selector: row => row.patientID,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>

        <div className='d-flex flex-column'>
          <Link
            to={`/apps/encounter/view/${row.encounterID}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getAllEncounter(row.encounterID))}
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
    sortField: 'addedDate',
    selector: row => row.editDate,
    cell: row => (
      <span className='text-capitalize'>
        {dateFormat(row.addedDate, "dd/mm/yyyy")}
      </span>
    )
  },
  {
    name: 'สถานะการตรวจ',
    minWidth: '138px',
    sortField: 'addedDate',
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
    name: 'ษา',
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.prescriptionID,
    cell: row => <Link>
      ดูรายการยา
    </Link>
  },
  {
    name: 'เมนู',
    minWidth: '140px',
    sortField: 'role',
    cell: row => (
      <div className='column-action'>
        <>
          <Link to={`/apps/encounter/view/${row.encounterID}`}>
            <Button.Ripple id='view' className='btn-icon' color='flat-success'>
              <FileText size={16} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip placement='top' target='view'>
            ดูบันทึก
          </UncontrolledTooltip>
        </>
      </div>
    )
  }
]
