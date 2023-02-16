// ** React Imports
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  Button
} from 'reactstrap'

// ** Store & Actions

import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getEncounter } from '../../patients/store'
import { useParams } from 'react-router-dom'


const patientSumList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.patients)

  console.log("this is store in PatientSumList")
  console.log(store)

  // ** States
  const [value] = useState('')
  const [rowsPerPage] = useState(6)
  const [currentPage] = useState(1)
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')

  //* Hooks
  const { id } = useParams()

  useEffect(() => {
    fetch(
      dispatch(
        getEncounter(parseInt(id))
      )
    )
  }, [dispatch, store.data.length])

  console.log("store.encounter")
  console.log(store.encounter)
  console.log("length : ")
  console.log(store.encounter.length)

  const dataToRender = () => {
    const filters = {
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.encounter.length > 0) {
      return store.encounter.slice(0, rowsPerPage)
    } else if (store.encounter.length === 0 && isFiltered) {
      return []
    } else {
      return store.encounter.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getEncounter({
        q: value,
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
