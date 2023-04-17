// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'


export const getAllData = createAsyncThunk('setting/getAllData', async () => {
    try {
        const response = await axios.get('http://localhost:8000/clinic');
        return response.data[0]
    } catch (error) {
        console.error(error)
    }
})

export const clinicInitial = createAsyncThunk('setting/clinicInitial', async (newData, {dispatch}) => {
    try {
        await axios.post('http://localhost:8000/clinic/initial', newData)
        await dispatch(getAllData())
    } catch (error) {
        console.log(error)
    }
})

export const updateClinic = createAsyncThunk('setting/updateClinic', async (newData,{dispatch}) => {
    try {
        await axios.put('http://localhost:8000/clinic/updateClinic', newData)
        await dispatch(getAllData())
    } catch (error) {
        console.log(error)
    }
})


export const settingGeneralSlice = createSlice({
    name: 'settingGeneral',
    initialState: {
        data: null,
        alltotal : 1 ,
        total: 1,
        params: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllData.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(updateClinic.fulfilled, (state,action) => {})
            .addCase(clinicInitial.fulfilled, (state,action) => {})
    }
})

export default settingGeneralSlice.reducer