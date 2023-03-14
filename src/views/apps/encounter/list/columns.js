// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { store } from '@store/store'
import { getAllEncounter, } from '../store'

// ** Icons Imports
import { FileText, Send } from 'react-feather'

// ** Reactstrap Imports
import {
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
    sortable: true,
    sortField: 'encounterID',
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
    sortable: true,
    sortField: 'fName',
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
    sortable: true,
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
    cell: row => <Link>
      ดูรายการยา
    </Link>
  },
  {
    name: '',
    minWidth: '140px',
    sortField: 'role',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <>
          <Link to={`/apps/encounter/view/${row.encounterID}`}>
            <Button.Ripple id={`view-${row.encounterID}`} className='btn-icon' color='flat-success'>
              <FileText size={18} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip placement='top' target={`view-${row.encounterID}`}>
            ดูบันทึก
          </UncontrolledTooltip>
        </>
        {row.eStatus == 0 ? (
          <div>
            <Link to={`/apps/invoice/preview/${row.invID}`}>
              <Button.Ripple id={`inv-${row.encounterID}`} className='btn-icon' color='flat-success'>
                <Send size={18} />
              </Button.Ripple>
            </Link>
            <UncontrolledTooltip placement='top' target={`inv-${row.encounterID}`}>
              ดูบันทึก
            </UncontrolledTooltip>
          </div>
        ) : (
          <div> </div>
        )}

      </div>
    )
  }
]
