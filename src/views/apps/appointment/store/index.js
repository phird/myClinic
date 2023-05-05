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
    console.log("i do getData")
    const response = await axios.get(`${appointmentURL}/appointment`, { params: params })
    console.log(response)
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

export const addEvent = createAsyncThunk('appAppt/addEvent', async (newData, {dispatch}) => {
try {
  await axios.post(`${appointmentURL}/appointment`,newData)
  const refresh = await dispatch(getData())
  return refresh.payload
} catch (error) {
  
}
})


// for calendar
export const getEvent = createAsyncThunk('appAppt/getEvent', async () => {
  try {
    const response = await axios.get(`${appointmentURL}/event`)
    return response.data
  } catch (error) {
    console.log("error in client side getEvent")
    console.log(error)
  }
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
      .addCase(addEvent.fulfilled, (state, action) => {
        state.data = action.payload
      })
      
  }
})

export default ApptSlice.reducer
