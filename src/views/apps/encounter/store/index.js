///**  Fix call encounter Here ! 
// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllEncounter = createAsyncThunk('appEncounters/getAllEncounter', async () => {
  const response = await axios.get('http://localhost:8000/app/Encounter/list/data')
  console.log(response.data.encounter)
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

//** get specific encounter for patient  */

//** ⭐️ legacy get encounter  */

export const getEncounter = createAsyncThunk('appEncounter/getEncounter', async id => {
  const response = await axios.get(`http://localhost:8000/app/Encounter/encounters/encounter/${id}`)
  return response.data.encounter[0]
})

//** end of code encounter */

export const addEncounter = createAsyncThunk('appEncounters/addEncounter', async (encounter, { dispatch, getState }) => {
  await axios.post('/apps/encounters/add-encounter', encounter)
  await dispatch(getData(getState().encounters.params))
  await dispatch(getAllData())
  return encounter
})

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
      .addCase(getEncounter.fulfilled, (state,action) =>{
        state.selectedEncounter = action.payload
      })

  }
})

export default appEncountersSlice.reducer
