// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

const appointmentURL = "http://localhost:8000/v1/api/appts"

export const getAllData = createAsyncThunk('appAppt/getAllData', async () => {
  const response = await axios.get(`${appointmentURL}`)
  return response.data
})

export const getData = createAsyncThunk('appAppt/getData', async params => {
  try {
    const response = await axios.get(`${appointmentURL}/appointment`, { params: params })
    return {
      params: params,
      data: response.data,
      totalPages: response.data.length
    }
  } catch (error) {
    console.log("error in getData")
    console.error(error)
  }
})

export const getEvent = createAsyncThunk('appAppt/getEvent', async () => {
  try {
    const response = await axios.get(`${appointmentURL}/event`)
    console.log("do getEvent and here is response : ")
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log("error in client side getEvent")
    console.log(error)
  }
})

export const getDrug = createAsyncThunk('/appDrugs/getDrug', async id => {
  try {
    const response = await axios.get(`http://localhost:8000/drugs/getDrug/${id}`)
    return response.data[0]
  } catch (error) {
    console.error(error)
  }
})


export const addDrug = createAsyncThunk('appDrugs/addDrug', async (newData) => {
  try {
    await axios.post('http://localhost:8000/drugs/add/drug', newData)
  } catch (error) {
    console.error(error)
  }
})

export const editDrug = createAsyncThunk('appDrugs/edit/Drug', async (newData) => {
  try {
    await axios.put('http://localhost:8000/drugs/edit/drug', newData)
  } catch (error) {
    console.error(error)
  }
})

export const deleteDrug = createAsyncThunk('appDrugs/deleteDrug', async (id) => {
  await axios.put(`http://localhost:8000/drugs/delete/drug/${id}`)
})

export const ApptSlice = createSlice({
  name: 'appAppt',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    events: [],
    selectedDrug: null
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
      .addCase(getEvent.fulfilled, (state, action) => {
        state.events = action.payload
      })
      .addCase(addDrug.fulfilled, (state, action) => {
        state.total = state.total + 1
      })
      .addCase(getDrug.fulfilled, (state, action) => {
        state.selectedDrug = action.payload
      })
      .addCase(editDrug.fulfilled, (state, action) => {
        state.selectedDrug = action.payload
      })
      .addCase(deleteDrug.fulfilled, (state, action) => {
        state.total = state.total - 1
      })
  }
})

export default ApptSlice.reducer
