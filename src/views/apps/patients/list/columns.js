// ** React Imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import dateFormat from 'dateformat'

// ** Store & Actions
import { store } from '@store/store'
import { getPatient, deleteUser } from '../store'

// ** Icons Imports
import { FileText, Trash2, Archive, Phone } from 'react-feather'

// ** Reactstrap Imports
import { Button, UncontrolledTooltip } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  const fullName = row.fname + ' ' + row.lname
  return (
    <Avatar initials className='me-1'
      color={'light-primary'}
      content={fullName}
    />
  )
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
            onClick={() => store.dispatch(getPatient(row.patientID))}
          >
            <span className='fw-bolder center'>#PT-{row.patientID}</span>
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
            onClick={() => store.dispatch(getPatient(row.patientID))}
          >
            <span className='fw-bolder'>{row.fname + ' ' + row.lname} </span>
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
    cell: row => <span className='text-capitalize'>{dateFormat(row.addedDate, "dd/mm/yyyy")}</span>
  },
  {
    minWidth: '230px',
    sortField: 'role',
    cell: row => (
      <div className='column-action'>
        <>
          <Link id='detail' to={`/apps/patient/view/${row.patientID}`} onClick={() => { getUser(row.patientID) }}>
            <Button.Ripple className='btn-icon' outline color='flat-success'>
              <FileText size={16} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip placement='top' target='detail'>
            โปรไฟล์ผู้ป่วย
          </UncontrolledTooltip>
        </>

        {/* <>
       <Link id='encounter' onClick={e => e.preventDefault()}>
          <Button.Ripple className='btn-icon' color='flat-success'>
            <Archive size={16} />
          </Button.Ripple>
        </Link>
        <UncontrolledTooltip placement='top' target='encounter'>
            ประวัติการรักษา
          </UncontrolledTooltip>
      </>*/}
        <>
          <Link id='delete' onClick={e => {
            e.preventDefault()
            store.dispatch(deleteUser(row.id))
          }}>
            <Button.Ripple className='btn-icon' color='flat-warning'>
              <Trash2 size={16} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip placement='top' target='delete'>
            ลบผู้ป่วย
          </UncontrolledTooltip>
        </>

      </div>
    )
  }
]
