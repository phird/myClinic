// ** React Imports
import { Link } from 'react-router-dom'
import { useState } from 'react'
// ** Icons Imports
import { FileText, Trash2 } from 'react-feather'
import {toast} from 'react-hot-toast'

// ** Reactstrap Imports
import {
  Button,
  UncontrolledTooltip
} from 'reactstrap'
// ** Imports Third Party Component
// ** Comfirmation Section
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)

// * Import Component 
import EditDisease from './Modal/EditDisease'
import { useDispatch, useSelector } from 'react-redux'
//** Store */
import { getDisease, deleteDisease, getData } from '../store'

export const columns = [
  {
    name: 'รหัสโรค',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row =>
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>#{row.diseaseID}</span>
        </div>
      </div>
  },
  {
    name: 'ชื่อโรค',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.drugName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{row.name}</span>
          </Link>
        </div>
      </div>
    )
  },

  {
    name: '',
    minWidth: '120px',
    cell: row => {
      const dispatch = useDispatch()
      const id = row.diseaseID
      const [open, setOpen] = useState(false)
      const store = useSelector(state => state.disease)

      const toggleModal = () => {
        setOpen(!open)
      }

      const handleShow = (e) => {
        e.preventDefault()
        dispatch(getDisease(id))
        toggleModal()
      }
      const handleDelete =  async(e) => {
        e.preventDefault();
        try {
          await dispatch(deleteDisease(row.diseaseID)).then(
            dispatch(getData())
          )
        } catch (error) {
          console.log(error)
        }
      }

      const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        const result = await MySwal.fire({
          title: 'ยืนยันการลบข้อมูลโรคหรือไม่?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ยืนยันการลบ',
          cancelButtonText: 'ยกเลิก',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
          },
          buttonsStyling: false
        })
        if (result.value) {
          handleDelete(event)
          toast.success('ลบข้อมูลโรคสำเร็จ', 5000)
        }
      }

      return (
        <div className='text-capitalize'>
          {/* View */}
          <div className='column-action d-flex align-items-center' >
            <Link>
              <Button.Ripple
                id={`view-${row.diseaseID}`}
                className='btn-icon'
                color='flat-success'
                onClick={handleShow}
              >
                <FileText size={18} />
              </Button.Ripple>
            </Link>
            <UncontrolledTooltip target={`view-${row.diseaseID}`}>
              ดูข้อมูลโรค
            </UncontrolledTooltip>

            <EditDisease id={row.diseaseID} open={open} toggleModal={toggleModal} store={store} />
            {/* Delete  */}
            <Link>
              <Button.Ripple id={`delete-${row.diseaseID}`} onClick={handleDeleteSubmit} className='btn-icon' color='flat-danger'>
                <Trash2 size={18} />
              </Button.Ripple>
            </Link>
            <UncontrolledTooltip target={`delete-${row.diseaseID}`} onClick={handleDelete}>
              ลบ
            </UncontrolledTooltip>
          </div>
        </div>
      )
    }
  }
]
