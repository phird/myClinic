// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'


export const getAllData = createAsyncThunk('appStaffs/getAllData', async () => {
  const response = await axios.get('http://localhost:8000/staff/')
  console.log("get all data ")
  console.log(response.data)
  return response.data
})

export const getAllDoc = createAsyncThunk('appStaffs/getAllData', async () => {
  const response = await axios.get('http://localhost:8000/staff/allData')
  return response.data
})


export const getData = createAsyncThunk('appStaffs/getData', async params => {
  const response = await axios.get('http://localhost:8000/staff/list/data', params)
  console.log(response)
  console.log("params : " )
  console.log(params)
  console.log("get data")
  console.log(response)
  return {
    params,
    data: response.data,
    totalPages: response.data.length
  }
})

// * INSERT NEW PATIENT TO DATABASE
export const postStaff = createAsyncThunk('appStaffs/postStff', async (newData) => {
  const response = await axios.post('http://localhost:8000/staff/createStaff', newData)
  return response.data
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get('/api/users/user', { id })
  console.log("this is getUser")
  console.log(response.data.user)
  return response.data.user
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/users/add-user', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/users/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appStaffsSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    doctor: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
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
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(postStaff.fulfilled, (state, action) => {
        state.total = state.total+ 1 
      })

  }
})

export default appStaffsSlice.reducer
