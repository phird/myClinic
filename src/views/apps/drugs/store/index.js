// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

const drugURL = "http://localhost:8000/"

const drugLLL  = "http://localhost:8000/drugs"

export const getAllData = createAsyncThunk('appDrugs/getAllData', async () => {
  const response = await axios.get(`${drugURL}drugs/list/allDrugs`)
  return response.data
})

export const getData = createAsyncThunk('appDrugs/getData', async params => {
  const response = await axios.get(`${drugURL}drugs/list/getDrug`, { params: params })
  return {
    params,
    data: response.data,
    totalPages: response.data.length
  }
})

export const getDrug = createAsyncThunk('/appDrugs/getDrug', async id => {
  try {
    const response = await axios.get(`${drugURL}drugs/getDrug/${id}`)
    return response.data[0]
  } catch (error) {
    console.error(error)
  }
})


export const addDrug = createAsyncThunk('appDrugs/addDrug', async (newData) => {
  try {
    await axios.post(`${drugURL}drugs/add/drug`,  newData )
  } catch (error) {
    console.error(error)
  }
})

export const editDrug = createAsyncThunk('appDrugs/edit/Drug', async(newData) => {
  try {
    await axios.put(`http://localhost:8000/drugs/edit/drug`, newData)
  } catch (error) {
    console.error(error)
  }
})

export const deleteDrug = createAsyncThunk('appDrugs/deleteDrug', async (id) => {
  await axios.put(`http://localhost:8000/drugs/delete/drug/${id}`)
})

export const DrugsSlice = createSlice({
  name: 'appDrugs',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
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
      .addCase(addDrug.fulfilled, (state,action) => {
        state.total = state.total+1
      })
      .addCase(getDrug.fulfilled, (state,action)=> {
        state.selectedDrug = action.payload
      })
      .addCase(editDrug.fulfilled, (state,action) => {
        state.selectedDrug = action.payload
      })
      .addCase(deleteDrug.fulfilled, (state, action) => {
        state.total = state.total - 1 
      })
  }
})

export default DrugsSlice.reducer
