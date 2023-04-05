// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appStaffs/getAllData', async (params) => {
  const response = await axios.get(`http://localhost:8000/staff/allData/${params}`)
  return response.data
})

export const getAllDoc = createAsyncThunk('appStaffs/getAllData', async () => {
  const response = await axios.get('http://localhost:8000/staff/allData')
  return response.data
})


export const getData = createAsyncThunk('appStaffs/getData', async params => {
  try {
    const response = await axios.get('http://localhost:8000/staff/list/data', { params: params })
    return {
      params,
      data: response.data,
      totalPages: response.data.length
    }
  } catch (error) {
    console.log("here an error")
    console.log(error)
  }
})

export const getCurrentStaff = createAsyncThunk('appStaffs/getCurrentStaff', async id => {
  try {
    const response = await axios.get(`/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

export const getStaffData = createAsyncThunk('appStaffs/getStaffData', async id => {
  try {
    const response = await axios.get(`http://localhost:8000/staff/getStaffData/${id}`);
    return response.data[0]
  } catch (error) {
    console.log(error)
  }
})

// * INSERT NEW PATIENT TO DATABASE
export const postStaff = createAsyncThunk('appStaffs/postStff', async (newData) => {
  const response = await axios.post('http://localhost:8000/staff/createStaff', newData)
  return response.data
})

// ** create users acount for staff 
export const createUser = createAsyncThunk('appStaffs/createUser', async (staffID) => {
  try {
    await axios.post('http://localhost:8000/jwt/createUser', {staffID})
  } catch (error) {
    console.log(error)
    console.error(error)
  }
})



export const getEncounterStaff = createAsyncThunk('appStaffs/getEncounterStaff', async id => {
  try {
    const response = await axios.get(`http://localhost:8000/staff/getEncounterStaff/${id}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    console.error(error)
  }
})

export const updateStaff = createAsyncThunk('appStaffs/updateStaff', async (newData, { dispatch }) => {
  const { id, ...updatedStaff } = newData
  try {
    await axios.put(`http://localhost:8000/staff/editStaffData/${id}`, updatedStaff);
    const refresh = await dispatch(getStaffData(id))
    console.log(refresh)
    return refresh.payload
  } catch (error) {
    console.log(error)
  }
})

export const updateRole = createAsyncThunk('appStaffs/updateRole', async (newData) => {
  const staffID = newData[0];
  const roleID = newData[1];
  console.log(staffID);
  console.log(roleID);
  await axios.put(`http://localhost:8000/staff/updateRole/${staffID}`, { roleID })
    .then(response => {
      console.log(response.data); // handle response from server
    })
    .catch(error => {
      console.log(error); // handle error from server
    });
})


export const updatePassword = createAsyncThunk('appStaffs/updatePassword', async (newData, {dispatch}) => {
  const userID = newData[0]
  const password = newData[1]
  await axios.put(`http://localhost:8000/jwt/updatePassword/${userID}`, { password })
    .then(response => {
      console.log(response.data); // handle response from server
    })
    .catch(error => {
      console.log(error); // handle error from server
    });
})

export const updateUsername = createAsyncThunk('appStaffs/updateUsername', async (newData, {dispatch}) => {
  const staffID = newData[0]
  const username = newData[1]
  try {
    await axios.put(`http://localhost:8000/jwt/setUsername`, {staffID, username})
  } catch (error) {
    console.log(error)
  }
})

export const deleteStaff = createAsyncThunk('appStaffs/deleteStaff' , async id => {
  try {
    await axios.put(`http://localhost:8000/staff/deleteStaff/${id}`)
  } catch (error) {
    console.error(error)
  }
})



export const getWidgetData = createAsyncThunk('/appStaffs/getWidgetData', async staffID => {
  try {
    const response = await axios.get(`http://localhost:8000/staff/widget/${staffID}`)
    return response.data[0]
  } catch (error) {
    console.log(error)
  }
})


export const appStaffsSlice = createSlice({
  name: 'appUsers',
  initialState: {
    currentStaff: [],
    data: [],
    allData: [],
    doctor: [],
    encounterStaff: [],
    widgetData: [],
    total: 1,
    params: {},
    selectedStaff: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentStaff.fulfilled, (state, action) => {
        state.currentStaff = action.payload
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(postStaff.fulfilled, (state, action) => {
        state.total = state.total + 1
      })
      .addCase(getStaffData.fulfilled, (state, action) => {
        state.selectedStaff = action.payload
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.selectedStaff = action.payload
      })
      .addCase(getEncounterStaff.fulfilled, (state, action) => {
        state.encounterStaff = action.payload
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
      })
      .addCase(getWidgetData.fulfilled, (state, action) => {
        state.widgetData = action.payload
      })
      .addCase(deleteStaff.fulfilled, (state,action)=>{
        state.total = state.total-1
      })

  }
})

export default appStaffsSlice.reducer
