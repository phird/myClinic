// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'


export const getAllData = createAsyncThunk('settingRole/getAllData', async () => {
    try {
        const response = await axios.get('http://localhost:8000/clinic');
        return response.data
    } catch (error) {
        console.error(error)
    }
})


export const settingGeneralSlice = createSlice({
    name: 'settingGeneral',
    initialState: {
        allData: [],
        data: [],
        total: 1,
        params: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllData.fulfilled, (state, action) => {
                state.allData = action.payload
            })
    }
})

export default settingGeneralSlice.reducer