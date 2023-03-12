///**  Fix call encounter Here ! 
// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
//* IMPORT 
import { createInvoice } from '../../invoice/store'
import { createPrescription } from '../../prescription/store'



export const getAllEncounter = createAsyncThunk('appEncounters/getAllEncounter', async () => {
  const response = await axios.get('http://localhost:8000/app/Encounter/list/data')
  return response.data.encounter
})

export const getEncounterData = createAsyncThunk('appEncounters/getEncounterData', async params => {
  const response = await axios.get('http://localhost:8000/app/Encounter/list/getdata', params)
  return {
    params,
    data: response.data.encounters,
    totalPage: 10
  }
})

export const postEncounter = createAsyncThunk('appEncounter/postEncounter', async (newData, { dispatch, getState }) => {
  console.log("postEncounter has been called")
  const response = await axios.post('http://localhost:8000/app/Encounter/createEncounter', newData)
  await dispatch(createInvoice(newData));
  await dispatch(createPrescription(newData));
  return response.data
})


//** get specific encounter for patient  */

//** ⭐️ legacy get encounter  */

export const getEncounter = createAsyncThunk('appEncounter/getEncounter', async id => {
  const response = await axios.get(`http://localhost:8000/app/Encounter/encounters/encounter/${id}`)
  return response.data.encounter[0]
})

export const getLatestEncounterID = createAsyncThunk('appEncounter/getLatestEncounterID', async () => {
  const idLastes = await axios.get('http://localhost:8000/app/Encounter/latestID')
  const enid = idLastes.data[0].id
  return enid
})

//** end of code encounter */

export const addNote = createAsyncThunk('appEncounter/addNote', async (dataArray) => {
  try {
    const response = await axios.put('http://localhost:8000/app/Encounter/addNote', dataArray)
    return response;
  } catch (error) {
    console.log("an error in addNote")
    console.log(error.response)
  }
})
//**  end of encounterSYMPTOM



//** Encounter_Symptoms  */
//* For Encounter SYMPTOM 
export const getSymptoms = createAsyncThunk('appEncounter/getSymptoms', async(encounterID)=> {
  try{
    const response = await axios.get('http://localhost:8000/encounterSymptom/getSymptoms', {params: {encounterID}} );
    return response.data
  }
  catch(err){
    console.log('an error in getSymptoms')
  }
})

export const addSymptom = createAsyncThunk('appEncounter/addSymptom', async (dataArray) => {
  console.log("what i sent")
  console.log(dataArray)
  try {
    const response = await axios.post('http://localhost:8000/encounterSymptom/addSymptom', dataArray);
    return response;
  } catch (error) {
    console.log('an error in addSymptom')
    console.log(error.response);
  }
})



//** ============================================ */

export const deleteEncounter = createAsyncThunk('appEncounters/deleteEncounter', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/encounter/delete', { id })
  await dispatch(getData(getState().encounters.params))
  await dispatch(getAllData())
  return id
})

export const appEncountersSlice = createSlice({
  name: 'appEncounters',
  initialState: {
    data: [],
    encounter: [],
    total: 1,
    etotal: 1,
    symptoms: [],
    params: {},
    allData: [],
    selectedEncounter: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllEncounter.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getEncounterData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPage
      })
      .addCase(getEncounter.fulfilled, (state, action) => {
        state.selectedEncounter = action.payload
      })
      .addCase(postEncounter.fulfilled, (state, action) => {
        state.data.push(action.payload)
        state.total = state.total + 1;
      })
      .addCase(getSymptoms.fulfilled, (state,action) => {
        state.symptoms = action.payload
      })

  }
})

export default appEncountersSlice.reducer
