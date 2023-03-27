// ** React Imports
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'

// ** Reactstrap Imports
import {
  Button,
  UncontrolledTooltip,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
}
  from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Download,
  File,
  Send,
  FileText
} from 'react-feather'
import DataTable from 'react-data-table-component'

//** dateFormat imports */
import dateFormat from 'dateformat'
import { getPrescription } from '../../prescription/store'

import { getPatientEncounter, getWidgetEncounter } from '../../encounter/store'

import { toast } from 'react-hot-toast'


// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'encounterID',
    minWidth: '107px',
    selector: row => row.encounterID,
    cell: row => <Link className='fw-bolder'
      to={`/apps/encounter/view/${row.encounterID}`}
    >#ENC{row.encounterID}</Link>
  },
  {
    name: 'วันที่ทำการตรวจ',
    sortable: true,
    minWidth: '150px',
    sortField: 'addedDate',
    selector: row => row.addedDate,
    cell: row => <Link className='fw-bolder'
      to={`/apps/encounter/view/${row.encounterID}`}
    >{dateFormat(row.addedDate, "dd/mm/yyyy") || 0}</Link>
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
    name: 'ยา',
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

      console.log(store)
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
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        {row.eStatus == 1 ? (
          <p> </p>
        ) : (
          <div>
            <Link className='text-body' to={`/apps/invoice/preview/${row.invID}`} id={`view-${row.encounterID}`}>
              <File size={18} className='mx-1' />
            </Link>
            <UncontrolledTooltip placement='top' target={`view-${row.encounterID}`}>
              ดูค่ารักษา
            </UncontrolledTooltip>
            <Link className='text-body' to={`/apps/invoice/preview/${row.invID}`} id={`download-${row.encounterID}`}>
              <Download className='text-body cursor-pointer' size={18} tag={Link} />
            </Link>
            <UncontrolledTooltip placement='top' target={`download-${row.encounterID}`}>
              ดาวน์โหลดค่ารักษา
            </UncontrolledTooltip>
          </div>
        )}
      </div>
    )
  },
]
