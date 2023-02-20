// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { store } from '@store/store'
import { getAllEncounter, deleteEncounter,} from '../store'

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

//** dateFormat imports */
import dateFormat from 'dateformat'


export const columns = [
  {
    name: 'รหัสการรักษา',
    sortable: true,
    minWidth: '50px',
    sortField: 'id',
    selector: row => row.epID,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/encounter/view/${row.epID}`}
            className='user_name text-truncate text-body'
            >
            <span className='fw-bolder'>#ENC-{row.epID}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'ชื่อผู้ป่วย',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.patientID,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>

        <div className='d-flex flex-column'>
          <Link
            to={`/apps/encounter/view/${row.epID}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getEncounter(row.encounterID))}
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
    selector: row => row.addedDate,
    cell: row => <span className='text-capitalize'>{dateFormat(row.addedDate, "dd/mm/yyyy")}</span>
  },
  {
    name: 'ษา',
    sortable: true,
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
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/encounter/view/${row.epID}`}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>รายละเอียด</span>
            </DropdownItem>
            <DropdownItem 
            tag='a'
            className='w-100' 
            onClick={e => e.preventDefault()}
            to={`/apps/encounter/view/${row.epID}`}
            >
              <Archive size={14} className='me-50' />
              <span className='align-middle'>แก้ไข</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteEncounter(row.encounterID))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>ลบ</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
