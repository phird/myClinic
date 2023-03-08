// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'


//* Here should get all data from Patient table 
export const getAllData = createAsyncThunk('appPatients/getAllData', async () => {
  try {
    const response = await axios.get('http://localhost:8000/app/Patient/list/data/')
    console.log("getAllData is working")
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const getData = createAsyncThunk('appPatients/getData', async params => {
  const response = await axios.get('http://localhost:8000/app/Patient/list/getdata', params)
  console.log("get data is working ")
  console.log(response.data.patients)
  return {
    params: params,
    data: response.data.patients,
    totalPages: 10,
  }
})
// * INSERT NEW PATIENT TO DATABASE
export const postPatient = createAsyncThunk('appPatients/postPatient', async (newData) => {
  console.log("postPatient has been called");
  const response = await axios.post('http://localhost:8000/app/Patient/createPatient', newData)
  return response.data
})

//* This one need to receive id from user to get user info 
export const getPatient = createAsyncThunk('appPatients/getPatient', async id => {
  const response = await axios.get(`http://localhost:8000/app/Patient/patients/patient/${id}`)
  /* const response = await axios.get('http://localhost:8000/app/Patient/patients/patient/${id}') */
  console.log("this is getPatient")
  return response.data.patient[0]
})

export const addUser = createAsyncThunk('appPatients/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/patients/add-patient', patient)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return patient
})

export const deleteUser = createAsyncThunk('appPatients/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/patient/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

// *** call getEncounter here //

export const getEncounter = createAsyncThunk('appPatient/getEncounter', async id => {
  const response = await axios.get(`http://localhost:8000/app/Encounter/list/getdata/${id}`)
 
  console.log("get encounter -> ")
  console.log(response.data.encounter)
  if (response.status === 200) {
    return {
      data: response.data.encounter,
      totalPage: 10
    }
  }else if (response.status === 404){
    return {
      data: null,
      totalPage: 1,
    }
  }
}
)
//* end of getEncounter


export const appPatientsSlice = createSlice({
  name: 'appPatients',
  initialState: {
    data: [],
    total: 1,
    encounter: [],
    etotal: 1,
    params: {},
    allData: [],
    selectedPatient: null,
  },
  reducers: {
    resetEncounterData : state => {
      state.encounter = [],
      state.etotal = 1
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.selectedPatient = action.payload
        state.patient = action.payload
      })
      .addCase(getEncounter.fulfilled, (state, action) => {
        state.encounter = action.payload.data
        state.etotal = action.payload.totalPage
      })
  }
})

export const { resetEncounterData } = appPatientsSlice.actions

export default appPatientsSlice.reducer
