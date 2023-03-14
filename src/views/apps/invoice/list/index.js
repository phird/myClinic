// ** React Imports
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Input, Row, Col, Card } from 'reactstrap'

// ** Store & Actions
import { getData } from '../store'

import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import Breadcrumbs from '@components/breadcrumbs'


const CustomHeader = ({ handleFilter, value, handlePerPage, rowsPerPage }) => {

  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Breadcrumbs title='จัดการการค่ารักษา' data={[{ title: 'บริการ' }, { title: 'จัดการการค่ารักษา' }]} />
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center me-2'>
            <label htmlFor='rows-per-page'>แสดง</label>
            <Input
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              className='form-control ms-50 pe-3'
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>รายการ</label>
          </div>
          {/* <Button tag={Link} to='/apps/invoice/add' color='primary'>
            เพิ่มใบเสร็จค่ารักษา
          </Button> */}
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>ค้นหา</label>
            <Input
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='รหัสการตรวจ'
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

const InvoiceList = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)

  console.log(store)

  // ** States
  const [sort, setSort] = useState('desc')
  const [value, setValue] = useState('')  // ** SearchTerm
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('invID')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    dispatch(
      getData(
        {
          sort,
          sortColumn,
          q: value,
          page: currentPage,
        }
      )
    )
  }, [dispatch, store.data.length, sort, sortColumn, currentPage ])

  const handleFilter = val => {
    setValue(val)
    dispatch(
      getData(
        {
          sort,
          sortColumn,
          q: val,
          page: currentPage,
        }
      )
    )
  }

  const handlePerPage = e => {
    const val = parseInt(e.target.value)
    dispatch(
      getData(
        {
          sort,
          sortColumn,
          q: value,
          page: currentPage,
        }
      )
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))
    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const dataToRender = () => {

    const filters = {
      q: value,
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    if (store.data.length > 0) {
      return store.data.slice(startIndex, endIndex);
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    console.log("HandleSort")
    console.log(sortDirection)
    if(sortDirection.toLowerCase() == 'asc'){
      sortDirection = 'desc'
    }else{
      sortDirection = 'asc'
    }
    setSort(sortDirection)
    setSortColumn(column.sortField)

    console.log("im gonna sort :")
    console.log(sortColumn)

    getData(
      {
        sort,
        sortDirection,
        sortColumn,
        q: value,
        page: currentPage,
      }
    )
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceID'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default InvoiceList
