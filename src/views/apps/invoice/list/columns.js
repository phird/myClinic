// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Edit,
  Download,
  MoreVertical,
  FileText
} from 'react-feather'

//** dateFormat imports */
import dateFormat from 'dateformat'

// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'Invoice.invID',
    minWidth: '107px',
    // selector: row => row.id,
    cell: row => <Link to={`/apps/invoice/preview/${row.invID}`}>{`#INV-${row.invID}`}</Link>
  },
  {
    name: 'ชื่อผู้ป่วย',
    sortable: true,
    minWidth: '350px',
    sortField: 'Patient.fname',
    // selector: row => row.client.name,
    cell: row => {
      const name = row.fname + ' ' + row.lname
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <Link
              to={`/apps/patient/view/${row.patientID}`}
              className='user_name text-truncate text-body'>
              <span className='user-name mb-0 fw-bolder'>{name}</span>
            </Link>
          </div>
        </div>
      )
    }
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'วันที่',
    sortField: 'Invoice.addedDate',
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
    // selector: row => row.dueDate
  },
  {
    name: '',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Link to={`/apps/invoice/preview/${row.invID}`} id={`pw-tooltip-${row.invID}`}>
          <FileText size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.invID}`}>
          ดูค่ารักษา
        </UncontrolledTooltip>

        <Link to={`/apps/invoice/print/${row.invID}`} id={`dl-tooltip-${row.invID}`}>
          <Download size={14} className='me-50' />
        </Link>
        <UncontrolledTooltip placement='top' target={`dl-tooltip-${row.invID}`}>
          ดาวน์โหลดค่ารักษา
        </UncontrolledTooltip>
      </div>
    )
  }
]
