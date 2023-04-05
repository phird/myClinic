import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


export const getAllData = createAsyncThunk('appDisease/getAllData', async () => {
    const response = await axios.get('/')
    return response.data
})








export const DiseaseSlice = createSlice({
    name: 'settingDisease',
    initialState: {
        data: [],
        total: 1,
        param: {},
        allData: [],
        selectedDisease: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getAllData.fulfilled, (state,action) => {
            state.allData = action.payload
        })
    }
}) 


export default DiseaseSlice.reducer