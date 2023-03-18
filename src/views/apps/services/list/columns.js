// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { store } from '@store/store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledTooltip, Button } from 'reactstrap'

export const columns = [
  {
    name: '#',
    minWidth: '230px',
    sortable: true,
    sortField: 'serviceID',
    selector: row => row.serviceID,
    cell: row => <span className='text-capitalize'>#{row.serviceID}</span>
  },
  {
    name: 'ชื่อบริการ',
    sortable: true,
    minWidth: '300px',
    sortField: 'sname',
    selector: row => row.sname,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.sname}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'ราคา',
    minWidth: '230px',
    sortable: true,
    sortField: 'sprice',
    selector: row => row.sprice,
    cell: row => <span className='text-capitalize'>{row.sprice}</span>
  },
  {
    name: '',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <Button.Ripple className='btn-icon rounded-circle me-50' color='flat-success'>
          <Link id={`edit-${row.serviceID}`}>
            <Archive size={16} />
          </Link>
          <UncontrolledTooltip target={`edit-${row.serviceID}`}>แก้ไข</UncontrolledTooltip>
        </Button.Ripple>

        <Button.Ripple className='btn-icon rounded-circle me-50' color='flat-danger'>
          <Link id={`del-${row.serviceID}`}>
            <Trash2 size={16}/>
          </Link>
          <UncontrolledTooltip target={`del-${row.serviceID}`}>ลบ</UncontrolledTooltip>
        </Button.Ripple>
      </div >
    )
  }
]
