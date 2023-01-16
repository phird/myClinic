// ** React Imports
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  Button
} from 'reactstrap'

// ** Store & Actions
import { getData } from '@src/views/apps/invoice/store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const patientSumList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)

  // ** States
  const [value] = useState('')
  const [rowsPerPage] = useState(6)
  const [currentPage] = useState(1)
  const [statusValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue
      })
    )
  }, [dispatch, store.data.length])

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data.slice(0, rowsPerPage)
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    )
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardHeader className='py-1'>
          <CardTitle tag='h4'>ประวัติการรักษา</CardTitle>
          <Button className='add-new-user' color='primary'>
              เพิ่มการรักษา
          </Button>
        </CardHeader>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            sortServer
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
          />
        </div>
      </Card>
    </div>
  )
}

export default patientSumList
