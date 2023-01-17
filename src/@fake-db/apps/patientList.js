import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  users: [
    {
      patientID: 1,
      firstname: 'John',
      lastname: 'Doe',
      phoneNo: '555-555-5556',
      dob: '02/14/1980',
      age: '43',
      bloodtype: 'A-',
      gender: 'Female',
      address: '456 Park Ave.',
      district: 'West',
      subdistrict: 'Uptown',
      province: 'New York',
      postalcode: '10002',
      personalID: '987-65-4321',
      addedDate: '15/01/2023',
      avatar: '',
    },
    {
      patientID: 2,
      firstname: 'Jane',
      lastname: 'Smith',
      phoneNo: '555-555-5556',
      dob: '02/14/1980',
      age: '43',
      bloodtype: 'A-',
      gender: 'Female',
      address: '456 Park Ave.',
      district: 'West',
      subdistrict: 'Uptown',
      province: 'New York',
      postalcode: '10002',
      personalID: '987-65-4321',
      addedDate: '15/01/2023',
      avatar: '',
    },
    {
      patientID: 3,
      firstname: 'Mike',
      lastname: 'Johnson',
      phoneNo: '555-555-5557',
      dob: '03/21/1990',
      age: '43',
      bloodtype: 'B+',
      gender: 'Male',
      address: '789 Elm St.',
      district: 'North',
      subdistrict: 'Midtown',
      province: 'New York',
      postalcode: '10003',
      personalID: '111-22-3333',
      addedDate: '15/01/2023',
      avatar: '',
    },
    {
      patientID: 4,
      firstname: 'Emily',
      lastname: 'Williams',
      phoneNo: '555-555-5558',
      dob: '04/12/1995',
      age: '43',
      bloodtype: 'AB-',
      gender: 'Female',
      address: '321 Oak St.',
      district: 'South',
      subdistrict: 'Outer Boroughs',
      province: 'New York',
      postalcode: '10004',
      personalID: '444-55-6666',
      addedDate: '15/01/2023',
      avatar: '',
    },
    {
      patientID: 5,
      firstname: 'David',
      lastname: 'Jones',
      phoneNo: '555-555-5559',
      dob: '05/23/1985',
      age: '43',
      bloodtype: 'O-',
      gender: 'Male',
      address: '159 Pine St.',
      district: 'East',
      subdistrict: 'Lower East Side',
      province: 'New York',
      postalcode: '10005',
      personalID: '777-88-9999',
      addedDate: '15/01/2023',
      avatar: '',
    }


  ]
}

// GET ALL DATA
mock.onGet('/api/patients/list/all-data').reply(200, data.users)

// POST: Add new user
mock.onPost('/apps/patients/add-patient').reply(config => {
  // Get event from post data
  const patient = JSON.parse(config.data)
  const highestValue = data.users.reduce((a, b) => (a.patientID > b.patientID ? a : b)).patientID

  patient.patientID = highestValue + 1

  data.users.push(patient)

  return [201, { patient }]
})

// GET Updated DATA
mock.onGet('/api/patients/list/data').reply(config => {
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    addedDate = '',
    sortColumn = 'fullName',
    patientID = '',
  } = config

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()

  const dataAsc = data.users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user =>
      (user.firstname.toLowerCase().includes(queryLowered) ||
        user.lastname.toLowerCase().includes(queryLowered)) &&
      user.patientID === (patientID || user.patientID) &&
      user.addedDate === (addedDate || user.addedDate)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      users: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/patients/patient').reply(config => {
  const { id } = config
  const user = data.users.find(i => i.id === data.users.patientID)
  return [200, { user }]
})

// DELETE: Deletes User
mock.onDelete('/apps/patient/delete').reply(config => {
  // Get user id from URL
  let pID = config.patientID

  // Convert Id to number
  pID = Number(pID)

  const userIndex = data.users.findIndex(t => t.patientID === patientID)
  data.users.splice(userIndex, 1)

  return [200]
})
