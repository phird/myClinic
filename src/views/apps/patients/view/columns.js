// ** React Imports
import { Link } from 'react-router-dom'


// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => row.id,
    cell: row => <Link className='fw-bolder' to={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</Link>
  },
  {
    name: 'วันที่ทำการตรวจ',
    sortable: true,
    minWidth: '150px',
    sortField: 'total',
    selector: row => row.total,
    cell: row => <span>${row.total || 0}</span>
  },
  {
    minWidth: '200px',
    name: 'ยาที่สั่ง',
    cell: row => <Link>
    ดูรายการยา    
     </Link>
  },
  {
    name: '',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Send className='text-body cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>

        <Link className='text-body' to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Invoice
        </UncontrolledTooltip>

        <Download className='text-body cursor-pointer' size={17} id={`download-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`download-tooltip-${row.id}`}>
          Download Invoice
        </UncontrolledTooltip>
      </div>
    )
  }
]
