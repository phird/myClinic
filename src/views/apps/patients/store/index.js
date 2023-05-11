// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'


const patientURL = "http://localhost:8000/app/Patient/"

//* Here should get all data from Patient table 
export const getAllData = createAsyncThunk('appPatients/getAllData', async () => {
  try {
    const response = await axios.get(`${patientURL}list/data/`)
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const getData = createAsyncThunk('appPatients/getData', async (params) => {
  const response = await axios.get(`${patientURL}list/getdata`, {params: params})
  /* console.log(response.data.patients.length) */
  return {
    params: params,
    data: response.data.patient,
    totalPages: response.data.patient.length,
  }
})

// * INSERT NEW PATIENT TO DATABASE
export const postPatient = createAsyncThunk('appPatients/postPatient', async (newData) => {
  const response = await axios.post(`${patientURL}createPatient`, newData)
  return response.data
})

export const updatePatient = createAsyncThunk('appPatients/updatePatient', async (newData, { dispatch, getState }) => {
  const { id, ...updatedPatient } = newData
  console.log("updatePatient has been called");
  await axios.put(`${patientURL}editPatient/${id}`, updatedPatient);
  const refresh = await dispatch(getPatient(id))
  return refresh.data.patient[0]
})

//* This one need to receive id from user to get user info 
export const getPatient = createAsyncThunk('appPatients/getPatient', async id => {
  const response = await axios.get(`${patientURL}patients/patient/${id}`)
  /* const response = await axios.get('http://localhost:8000/app/Patient/patients/patient/${id}') */
  console.log("this is getPatient")
  return response.data.patient[0]
})



export const appPatientsSlice = createSlice({
  name: 'appPatients',
  initialState: {
    data: [], //* ALL PATIENT HERE
    total: 1,
    params: {},
    allData: [],
    selectedPatient: null, //* PATIENT FROM SPECIFIC ID
  },
  reducers: {},
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
      .addCase(postPatient.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.total = state.total + 1;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.selectedPatient = action.payload
      })
  }
})

export default appPatientsSlice.reducer
