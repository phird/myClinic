// ** Reactstrap Imports
import { Card, CardHeader } from 'reactstrap'

// ** React Imports 
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { useState } from 'react'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Store 
import { getEncounterStaff} from '../store'



export const columns = [
  {
    name: 'รหัสการรักษา',
    selector: row => (
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
    selector: row => row.patientID,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>

        <div className='d-flex flex-column'>
          <Link
            to={`/apps/patient/view/${row.patientID}`}
            className='user_name text-truncate text-body'
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
    selector: row => row.editDate,
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
  },
]

const UserEncountersList = () => {
  const dispatch = useDispatch()
  // ** Hooks 
  const id = useParams()
  // ** get data
  const store = useSelector(state => state.staff)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  useEffect(() => {
    dispatch(getEncounterStaff(parseInt(id.id)))
  }, [store.selectedStaff.length])


  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.encounterStaff.length / rowsPerPage))
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  const dataToRender = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage

    if (store.encounterStaff.length > 0) {
      return store.encounterStaff.slice(startIndex, endIndex)
    } else if (store.encounterStaff.length === 0) {
      return []
    } else {
      return store.encounterStaff
    }
  }


  return (
    <Card>
      <CardHeader tag='h4'>ข้อมูลการตรวจล่าสุด</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          pagination
          paginationServer
          paginationComponent={CustomPagination}
          columns={columns}
          data={dataToRender()}
          className='react-dataTable'
        /* sortIcon={<ChevronDown size={10} />} */
        />
      </div>
    </Card>
  )
}


export default UserEncountersList