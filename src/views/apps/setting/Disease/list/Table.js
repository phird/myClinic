// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText } from 'react-feather'

// @deno-types="https://unpkg.com/xlsx/types/index.d.ts"
import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';

/* load the codepage support library for extended support with older formats  */
import * as cptable from 'https://unpkg.com/xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);
import { saveAs } from 'file-saver';

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Button,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Component 
import ModalDisease from './Modal/ModalDisease'


// ** Table Header
const CustomHeader = ({ store, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {

    // **state
    const [show, setShow] = useState(false)
    const toggleModal = () => setShow(!show)

    return (
        <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <label htmlFor='rows-per-page'> แสดง </label>
                        <Input
                            className='mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{ width: '5rem' }}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </Input>
                        <label htmlFor='rows-per-page'> รายการ </label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                        <label className='mb-0' htmlFor='search-invoice'>
                            ค้นหา:
                        </label>
                        <Input
                            id='search-invoice'
                            className='ms-50 w-100'
                            type='text'
                            value={searchTerm}
                            placeholder='ชื่อโรค / รหัสโรค'
                            onChange={e => handleFilter(e.target.value)}
                        />
                    </div>

                    <div className='d-flex align-items-center table-header-actions'>
                        <Button className='add-new-user' color='primary' onClick={toggleModal}>
                            เพิ่มโรค
                        </Button>
                    </div>
                </Col>
            </Row>
            <ModalDisease open={show} toggleModal={toggleModal}/>
        </div>
    )
}

const DrugsList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.disease)

    // ** States
    const [sort, setSort] = useState('desc')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('drugID')
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // ** Get data on mount
    useEffect(() => {
        dispatch(getAllData())
        dispatch(
            getData({
                sort,
                sortColumn,
                q: searchTerm,
                page: currentPage,
                perPage: rowsPerPage,
            })
        )
    }, [dispatch, store.data.length, store.total, sort, sortColumn, searchTerm, currentPage, store.selectedDrug])


    // ** Function in get data on page change
    const handlePagination = page => {
        dispatch(
            getData({
                sort,
                sortColumn,
                q: searchTerm,
                perPage: rowsPerPage,
                page: page.selected + 1,
            })
        )
        setCurrentPage(page.selected + 1)
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        dispatch(
            getData({
                sort,
                sortColumn,
                q: searchTerm,
                perPage: value,
                page: currentPage,
            })
        )
        setRowsPerPage(value)
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        dispatch(
            getData({
                sort,
                q: val,
                sortColumn,
                page: currentPage,
                perPage: rowsPerPage,

            })
        )
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(Math.ceil(store.total / rowsPerPage))

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

    // ** Table data to render
    const dataToRender = () => {
        const filters = {
            q: searchTerm
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })

        const startIndex = (currentPage - 1) * rowsPerPage
        const endIndex = startIndex + rowsPerPage

        if (store.data.length > 0) {
            return store.data.slice(startIndex, endIndex)
        } else if (store.data.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
        }
    }

    const handleSort = (column, sortDirection) => {
        if (sortDirection.toLowerCase() == 'asc') {
            sortDirection = 'desc'
        } else {
            sortDirection = 'asc'
        }
        setSort(sortDirection)
        setSortColumn(column.sortField)
        dispatch(
            getData({
                sort,
                sortColumn,
                q: searchTerm,
                page: currentPage,
                perPage: rowsPerPage,
            })
        )
    }

    return (
        <Fragment>
            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        columns={columns}
                        onSort={handleSort}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        paginationComponent={CustomPagination}
                        data={dataToRender()}
                        subHeaderComponent={
                            <CustomHeader
                                store={store}
                                searchTerm={searchTerm}
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}

                            />
                        }
                    />
                </div>
            </Card>


        </Fragment>
    )
}

export default DrugsList
