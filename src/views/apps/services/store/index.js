// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appService/getAllData', async () => {
  try {
    const response = await axios.get('http://localhost:8000/services/list/getAllData')
    return response.data.services
  } catch (error) {
    console.error(error)
  }
})

export const getData = createAsyncThunk('appService/getData', async params => {
  try {
    const response = await axios.get('http://localhost:8000/services/list/getData', { params: params })
    console.log(response)
    return {
      params,
      data: response.data.services,
      totalPages: response.data.services.length
    }
  } catch (error) {
    console.error(error)
  }
})

export const getServiceData = createAsyncThunk('appService/getServiceData', async (id) => {
  const response  = await axios.get(`http://localhost:8000/services/getService/${id}`);
  return response.data[0]
})

export const addService = createAsyncThunk('appService/addService', async(newData) => {
  const response = await axios.post('http://localhost:8000/services/addService', newData);
  return response.data
})

export const editService = createAsyncThunk('appService/editService', async newData => {
  await axios.put('http://localhost:8000/services/updateService',  { params: newData })
})

export const deleteService = createAsyncThunk('appService/deleteService' , async (id) => {
  await axios.put(`http://localhost:8000/services/delete/${id}`)
})





export const appServiceSlice = createSlice({
  name: 'appService',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedService: [],
    slength: 1,
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
      .addCase(addService.fulfilled, (state, action) => {
        state.total = state.total+1 
      })
      .addCase(deleteService.fulfilled, (state, action)=>{
        state.total = state.total-1
      })
      .addCase(getServiceData.fulfilled, (state, action) => {
        console.log("added SelectSevicee")
        state.selectedService = action.payload
        state.slength = action.payload.length
      }) 
  }
})

export default appServiceSlice.reducer
