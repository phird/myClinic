// ** React Imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { Search, Inbox, Camera, Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Phone, Cpu } from 'react-feather'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, Row, Col, Button,UncontrolledTooltip } from 'reactstrap'
/* import { Tooltip as ReactTooltip } from 'react-tooltip' */
// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Fragment } from 'react'

// ** Renders Client Columns
const renderClient = row => {
  const fullName = row.firstname + ' ' + row.lastname
  if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={fullName || 'John Doe'}
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = row => {

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Phone size={20} className='me-50' />
      {row.phoneNo}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'รหัสผู้ป่วย',
    sortable: true,
    minWidth: '50px',
    sortField: 'id',
    selector: row => row.patientID,
    cell: row => (
      <div className='d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/patient/view/${row.patientID}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.patientID))}
          >
            <span className='fw-bolder center'>{row.patientID}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'ชื่อผู้ป่วย',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.firstname,
    cell: row => (
      <div className='d-flex justify-content-center align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/patient/view/${row.patientID}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.patientID))}
          >
            <span className='fw-bolder'>{row.firstname + ' ' + row.lastname} </span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'เบอร์โทรคิดค่อ',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.phoneNo,
    cell: row => renderRole(row)
  },
  {
    name: 'วันที่ลงทะเบียน',
    minWidth: '200px',
    sortable: true,
    sortField: 'addedDate',
    selector: row => row.addedDate,
    cell: row => <span className='text-capitalize'>{row.addedDate}</span>
  },
  {
    minWidth: '230px',
    sortField: 'role',
    cell: row => (
      <div className='column-action'>
        <>
          <Link id='detail' to={`/apps/patient/view/${row.patientID}`} onClick={() => { store.dispatch(getUser(row.patientID)) }}>
            <Button.Ripple className='btn-icon' outline color='flat-success'>
              <FileText size={16} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip placement='top' target='detail'>
            โปรไฟล์ผู้ป่วย
          </UncontrolledTooltip>
        </>


        <Link onClick={e => e.preventDefault()}>
          <Button.Ripple className='btn-icon' color='flat-success'>
            <Archive size={16} />
          </Button.Ripple>
        </Link>
        <Link onClick={e => {
          e.preventDefault()
          store.dispatch(deleteUser(row.id))
        }}>
          <Button.Ripple className='btn-icon' color='flat-success'>
            <Trash2 size={16} />
          </Button.Ripple>
        </Link>
      </div>
    )
  }
]
