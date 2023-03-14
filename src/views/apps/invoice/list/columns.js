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
  MoreVertical
} from 'react-feather'

//** dateFormat imports */
import dateFormat from 'dateformat'

// ** renders client column
const renderClient = row => {
  const name = row.fname + ' ' + row.lname
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]
  return <Avatar color={color} className='me-50' content={name} initials />
}

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
    name: 'รหัสการตรวจ',
    minWidth: '50px',
    sortable: true,
    sortField: 'Invoice.patientID',
    selector: row => row.patientID,
    cell: row => (
      <div className='d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column'>
          <Link to={`/apps/encounter/view/${row.encounterID}`}>
            {`#ENC-${row.encounterID}`}
          </Link>
          <Link className='text-body' to={`/apps/patient/view/${row.patientID}`}>
            <span> {`#PT-${row.patientID}`} </span>
          </Link>
        </div>
      </div>
    )
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
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <Link
              to={`/apps/invoice/preview/${row.invID}`}
              className='user_name text-truncate text-body'
            >
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
    cell: row => (
      <span className='text-capitalize'>
        {dateFormat(row.addedDate, "dd/mm/yyyy")}
      </span>
    )
    // selector: row => row.dueDate
  },
  {
    name: '',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Link to={`/apps/invoice/preview/${row.invID}`} id={`pw-tooltip-${row.invID}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.invID}`}>
          ดูค่ารักษา
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag={Link} to={`/apps/invoice/print/${row.invID}`} target='_blank' className='w-100'>
              <Download size={14} className='me-50' />
              <span className='align-middle'>Download</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
