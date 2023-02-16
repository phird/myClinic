import { MoreVertical } from 'react-feather'
import mock from '../mock'

// * import utils 
import { paginateArray } from '../utils'


const data = {
    encounters: [
        {
            encounterID: 1,
            patientID: 1,
            doctorID: 1,
            prescriptionID: 1,
            appoinmentID: 1,
            symptom: '',
            treatmentNote: 'note note note note',
            addedDate: '233/1/2566'
        },
        {
            encounterID: 2,
            patientID: 1,
            doctorID: 1,
            prescriptionID: 1,
            appoinmentID: 1,
            symptom: '',
            treatmentNote: 'note note note note',
            addedDate: '17/1/2566'
        },
        {
            encounterID: 3,
            patientID: 1,
            doctorID: 1,
            prescriptionID: 1,
            appoinmentID: 1,
            symptom: '',
            treatmentNote: 'note note note note',
            addedDate: '17/1/2566'
        },
        {
            encounterID: 4,
            patientID: 1,
            doctorID: 1,
            prescriptionID: 1,
            appoinmentID: 1,
            symptom: '',
            treatmentNote: 'note note note note',
            addedDate: '17/1/2566'
        },
        {
            encounterID: 5,
            patientID: 1,
            doctorID: 1,
            prescriptionID: 1,
            appoinmentID: 1,
            symptom: '',
            treatmentNote: 'note note note note',
            addedDate: '17/1/2566'
        },
    ]
}


// GET ALL DATA
mock.onGet('/api/encounters/list/all-data').reply(200, data.encounters)

// POST: add new Encounter
mock.onPost('/apps/encounters/add-encounter').reply(config => {
    // Get event from post data
    const encounter = JSON.parse(config.data)
    const highestValue = data.encounters.reduce((a, b) => (a.encounterID > b.encounterID ? a : b)).encounterID

    encounter.encounterID = highestValue + 1

    data.encounters.push(encounter)

    return [201, { encounter }]
})

// GET Upload DATA
mock.onGet('/api/encounters/list/data').reply(config => {
    const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'asc',
        patientID = '',
        addedDate = '',
        encounterID = '',
        sortColumn = ''
    } = config

    /* eslint0disable */
    const queryLowered = q.toLowerCase()

    const dataAsc = data.encounters.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

    const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

    const filteredData = dataToFilter.filter(
        encounter =>
            encounter.encounterID === (encounterID || encounter.encounterID) &&
            encounter.addedDate === (addedDate || encounter.addedDate) &&
            encounter.patientID === (patientID || encounter.patientID)
    )
     /* eslint-enable  */

    return [
        200,
        {
            total: filteredData.length,
            encounters: paginateArray(filteredData, perPage, page)
        }
    ]
})


// GET ENCOUNTER
mock.onGet('/api/encounters/encounter').reply(
    config => {
        const { id } = config
        const encounter = data.encounters.find(i => i.encounterID === id)
        return [200, (encounter)]
    })

// DELETE Encounter
mock.onDelete('/apps/encounter/delete').reply(config => {
    // get encounter id 
    let eId = config.encounterID

    // convert it into Number
    eId = Number(eId)

    const encounterIndex = data.encounters.findIndex(t => t.encounterID === eId)
    data.encounters.splice(encounterIndex, 1)

    return [200]
})






