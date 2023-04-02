// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('settingRole/getAllData', async () => {
    try {
        const response = await axios.get('http://localhost:8000/role');
        return response.data
    } catch (error) {
        console.error(error)
    }
})


export const appRoleSlice = createSlice({
    name: 'appRole',
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

export default appRoleSlice.reducer