// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import {
  UncontrolledTooltip,
  Button,
  Badge
} from 'reactstrap'

// ** Third Party Components
import {
  Download,
  FileText
} from 'react-feather'

//** dateFormat imports */

// ** Table columns
export const columns = [
  {
    name: 'รหัสค่ารักษา',
    sortable: true,
    sortField: 'Invoice.invID',
    minWidth: '107px',
    // selector: row => row.id,
    cell: row =>
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/invoice/preview/${row.invID}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>#INV-{`${row.invID}`}</span>
          </Link>
        </div>
      </div>

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
              <span className='user-name mb-0 fw-bolder me-1'>{name}</span>
              {row.delStatus == 1 ? <Badge color='danger'> ข้อมูลผู้ป่วยถูกลบ </Badge> : ''}         
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
          <Button.Ripple
            className='btn-icon'
            color='flat-success'
          >
            <FileText size={18}/>
          </Button.Ripple>
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.invID}`}>
          ดูค่ารักษา
        </UncontrolledTooltip>

        <Link to={`/apps/invoice/print/${row.invID}`}  id={`dl-tooltip-${row.invID}`} target='_blank'>
          <Button.Ripple
            className='btn-icon'
            color='flat-success'
          >
            <Download size={18}/>
          </Button.Ripple>
        </Link>
        <UncontrolledTooltip placement='top' target={`dl-tooltip-${row.invID}`}>
          ดาวน์โหลดค่ารักษา
        </UncontrolledTooltip>
      </div>
    )
  }
]
