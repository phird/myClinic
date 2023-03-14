// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'


//* Here should get all data from Patient table 
export const getAllData = createAsyncThunk('appPatients/getAllData', async () => {
  try {
    const response = await axios.get('http://localhost:8000/app/Patient/list/data/')
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const getData = createAsyncThunk('appPatients/getData', async (params) => {
  const response = await axios.get('http://localhost:8000/app/Patient/list/getdata', {params: params})
  /* console.log(response.data.patients.length) */
  return {
    params: params,
    data: response.data.patient,
    totalPages: response.data.patient.length,
  }
})
// * INSERT NEW PATIENT TO DATABASE
export const postPatient = createAsyncThunk('appPatients/postPatient', async (newData) => {
  const response = await axios.post('http://localhost:8000/app/Patient/createPatient', newData)
  return response.data
})

export const updatePatient = createAsyncThunk('appPatients/updatePatient', async (newData, { dispatch, getState }) => {
  const { id, ...updatedPatient } = newData
  console.log("updatePatient has been called");
  await axios.put(`http://localhost:8000/app/Patient/editPatient/${id}`, updatedPatient);
  const refresh = await dispatch(getPatient(id))
  return refresh.data.patient[0]
})

//* This one need to receive id from user to get user info 
export const getPatient = createAsyncThunk('appPatients/getPatient', async id => {
  const response = await axios.get(`http://localhost:8000/app/Patient/patients/patient/${id}`)
  /* const response = await axios.get('http://localhost:8000/app/Patient/patients/patient/${id}') */
  console.log("this is getPatient")
  return response.data.patient[0]
})


// *** call getEncounter here //
export const postPatientEncounter = createAsyncThunk('appEncounter/postEncounter', async (newData, { dispatch, getState }) => {
  const { PatientID, ...postEncounter } = newData
  await axios.post('http://localhost:8000/app/Encounter/createEncounter', newData)
  try {
    const refresh = await dispatch(getPatientEncounter(PatientID))
    console.log("refresh data")
    console.log(refresh.data)
  } catch (error) {
    console.log("facing some error")
    console.log(error)
  }
  return refresh.data
})

export const getPatientEncounter = createAsyncThunk('appPatient/getEncounter', async (id) => {
  console.log("Call get Encounter")
  const response = await axios.get(`http://localhost:8000/app/Patient/list/getPatientEncounter/${id}`)
  console.log("getPTEncounter");
  console.log(response.data.encounter)
  if (response.status == 200) {
    return {
      data: response.data.encounter,
      totalPage: 10
    }
  } return {
    data: null,
    totalPage: 1
  }
}
)
//* end of getEncounter


export const appPatientsSlice = createSlice({
  name: 'appPatients',
  initialState: {
    data: [], //* ALL PATIENT HERE
    total: 1,
    encounter: [], //* WHERE ENCOUNTER FROM PATIENT BELONG
    etotal: 1,
    params: {},
    allData: [],
    selectedPatient: null, //* PATIENT FROM SPECIFIC ID
  },
  reducers: {
    resetEncounterData: state => {
      console.log("reseting")
      state.encounter = [],
        state.etotal = 1
      console.log("now encounterPatient Are: ")
      console.log(state.encounter)
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
      .addCase(getPatientEncounter.fulfilled, (state, action) => {
        state.encounter = action.payload.data
        state.etotal = action.payload.totalPage
      })
      .addCase(postPatientEncounter.fulfilled, (state, action) => {
        state.encounter.push(action.payload);
        state.etotal = state.etotal + 1;
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

export const { resetEncounterData } = appPatientsSlice.actions

export default appPatientsSlice.reducer
