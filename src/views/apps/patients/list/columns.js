// ** React Imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import dateFormat from 'dateformat'

// ** Store & Actions
import { store } from '@store/store'
import { getPatient} from '../store'
import { getWidgetEncounter } from '../../encounter/store'

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
    sortField: 'patientID',
    selector: row => row.patientID,
    cell: row => (
      <div className='d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/patient/view/${row.patientID}`}
            className='user_name text-truncate text-body'
            onClick={() => {
              store.dispatch(getPatient(row.patientID))
              store.dispatch(getWidgetEncounter(row.patientID))
            }}
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
    sortField: 'fname',
    selector: row => row.firstname,
    cell: row => (
      <div className='d-flex justify-content-center align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/patient/view/${row.patientID}`}
            className='user_name text-truncate text-body'
            onClick={() => {
              store.dispatch(getPatient(row.patientID))
              store.dispatch(getWidgetEncounter(row.patientID))
            }}
          >
            <span className='fw-bolder'>{row.fname + ' ' + row.lname} </span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'เบอร์โทรคิดค่อ',
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
  {
    minWidth: '230px',
    sortField: 'role',
    cell: row => (
      <div className='column-action'>
        <>
          <Link id={`view-${row.patientID}`} to={`/apps/patient/view/${row.patientID}`} onClick={() => { getUser(row.patientID) }}>
            <Button.Ripple  className='btn-icon' outline color='flat-success'>
              <FileText size={16} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip placement='top' target={`view-${row.patientID}`}>
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
          <Link id={`delete-${row.patientID}`} onClick={() => {
              store.dispatch(getPatient(row.patientID))
              store.dispatch(getWidgetEncounter(row.patientID))
            }}
            >
            <Button.Ripple  className='btn-icon' color='flat-warning'>
              <Trash2 size={16} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip placement='top' target={`delete-${row.patientID}`}>
            ลบผู้ป่วย
          </UncontrolledTooltip>
        </>

      </div>
    )
  }
]
