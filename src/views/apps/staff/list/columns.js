// ** React Imports
import { Link } from 'react-router-dom'

// ** Icons Imports
import {
  FileText,
  Trash2,


} from 'react-feather'

// ** Reactstrap Imports
import {
  Button,
  UncontrolledTooltip

} from 'reactstrap'


export const columns = [
  {
    name: '#',
    sortable: true,
    minWidth: '172px',
    sortField: 'staffID',
    selector: row => row.staffID,

  },
  {
    name: 'ชื่อ',
    sortable: true,
    minWidth: '300px',
    sortField: 'fname',
    selector: row => row.fname,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/staff/view/${row.staffID}`}
            className='user_name text-truncate text-body'
            
          >
            <span className='fw-bolder'>{row.fname + ' ' + row.lname}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'เพศ',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.gender,

  },
  {
    name: 'บทบาท',
    selector: row => row.role,
    cell: row => (
      <div>
        {row.role === 'general' ? 'ทั่วไป' : 'ผู้ดูแล'}
      </div>
    )
  },
  {
    name: ' ',
    minWidth: '100px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <>
          <Link to={`/apps/staff/view/${row.staffID}`}>
            <Button.Ripple
              className='btn-icon'
              id={`edit-${row.serviceID}`}
              color='flat-success'
              to={`/view/${row.staffID}`}
            >
              <FileText size={16} />
            </Button.Ripple>
            <UncontrolledTooltip target={`edit-${row.serviceID}`}>
              ดูข้อมูล
            </UncontrolledTooltip>
          </Link>
          <Button.Ripple className='btn-icon' color='flat-danger' id={`del-${row.serviceID}`}>
            <Trash2 size={16} />
          </Button.Ripple>
          <UncontrolledTooltip target={`del-${row.serviceID}`} >
            ลบ
          </UncontrolledTooltip>
        </>
      </div>
    )
  }
]
