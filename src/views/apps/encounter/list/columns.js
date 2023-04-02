// ** React Imports
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

// ** Store & Actions
import { getAllEncounter, } from '../store'
// ** Icons Imports
import { FileText, Send, Download, } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

// ** Reactstrap Imports
import {
  Button,
  UncontrolledTooltip,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap'

import DataTable from 'react-data-table-component'

//** dateFormat imports */
import dateFormat from 'dateformat'
import { getPrescription } from '../../prescription/store'
import { toast } from 'react-hot-toast'

export const columns = [
  {
    name: 'รหัสการรักษา',
    minWidth: '50px',
    sortable: true,
    sortField: 'encounterID',
    selector: row => row.encounterID,
    cell: row => (
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
    sortable: true,
    sortField: 'fName',
    selector: row => row.patientID,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>

        <div className='d-flex flex-column'>
          <Link
            to={`/apps/patient/view/${row.patientID}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getAllEncounter(row.encounterID))}
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
    sortable: true,
    sortField: 'addedDate',
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
  {
    name: 'สถานะการตรวจ',
    minWidth: '138px',
    sortable: true,
    sortField: 'eStatus',
    selector: row => row.eStatus,
    cell: row => <span className='text-capitalize'>{
      row.eStatus == 0 ? (
        <Badge color='success'>
          ตรวจเสร็จสิ้น
        </Badge>) : (
        <Badge color='danger'>
          ยังไม่ได้ทำการตรวจ
        </Badge>)}</span>
  },
  {
    name: '',
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.prescriptionID,
    cell: (row) => {
      const dispatch = useDispatch()
      const [showModal, setShowModal] = useState(false);
      const [drugList, setDrugList] = useState([])
      const store = useSelector(state => state.prescription)
      const id = row.encounterID
      const drugRetrieve = [
        {
          name: 'ชื่อยา',
          selector: row => row.drugName,
          cell: row => {
            return (
              <div className='d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column'>
                  <span className='fw-bolder'> {row.drugName}</span>
                </div>
              </div>
            )
          }
        },
        {
          name: 'จำนวน',
          selector: row => row.quantity,
          cell: row => {
            return (
              <>
                <div className='column-action'>
                  <span className='text-capitalize'> {row.quantity} {row.unit} </span>
                </div>
              </>
            )
          }
        },
      ]
      useEffect(() => {
        setDrugList(store.prescriptions)
      }, [store.prescriptions])

      const handleModalClose = () => {
        setDrugList([]);
      }
      const handleMouseOver = () => {
        dispatch(getPrescription(id))
        setShowModal(true)
      }
      return (
        <div className='text-capitalize'>
          {row.eStatus == 0 ? (
            <Button.Ripple color='flat-dark'
              onClick={handleMouseOver}
            >
              ดูรายการยา
            </Button.Ripple>
          ) : (
            <></>
          )}

          <Modal className='modal-dialog-centered modal-lg ' isOpen={showModal} onClosed={handleModalClose}>
            <ModalHeader className='bg-transparent' toggle={() => setShowModal(!showModal)}></ModalHeader>
            <ModalBody>
              <div className='text-center mb-2'>
                <h3 className='mb-1'>รายการยา</h3>
                <p> รหัสการตรวจ #{id} ของคุณ {row.fname} {row.lname} </p>
                <div className='react-dataTable'>
                  <DataTable
                    noHeader
                    responsive
                    columns={drugRetrieve}
                    data={drugList}
                    className='react-dataTable'
                  />
                </div>
              </div>

            </ModalBody>
          </Modal>

        </div>
      )
    }

  },
  {
    name: '',
    minWidth: '140px',
    sortField: 'role',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <>
          <Link to={`/apps/encounter/view/${row.encounterID}`}>
            <Button.Ripple id={`view-${row.encounterID}`} className='btn-icon' color='flat-success'>
              <FileText size={18} />
            </Button.Ripple>
          </Link>
          <UncontrolledTooltip placement='top' target={`view-${row.encounterID}`}>
            ดูบันทึก
          </UncontrolledTooltip>
        </>
        {row.eStatus == 0 ? (
          <div>
            <Link to={`/apps/invoice/preview/${row.invID}`}>
              <Button.Ripple
                id={`inv-${row.encounterID}`}
                className='btn-icon'
                color='flat-success'
              >
                <Download size={18} />
              </Button.Ripple>
            </Link>
            <UncontrolledTooltip placement='top' target={`inv-${row.encounterID}`}>
              ดาวน์โหลดค่ารักษา
            </UncontrolledTooltip>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    )
  },
]





