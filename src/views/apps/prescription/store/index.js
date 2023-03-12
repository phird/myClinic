// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Import 

import { getLatestEncounterID } from '../../encounter/store'

export const createPrescription = createAsyncThunk('appPrescription/createPrescription', async (data, { dispatch }) => {
    const encounterID = await dispatch(getLatestEncounterID());
    data['encounterID'] = encounterID.payload;
    const response = await axios.post('http://localhost:8000/prescriptions/createPrescription', data)
})

export const getPrescription = createAsyncThunk('appPrescription/getPrescription', async(encounterID) => {
    try {
        const response = await axios.get(`http://localhost:8000/prescriptions/getPrescription/${encounterID}`);
        console.log("response =>")
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("there some error ")
        console.log(error)
    }
})




export const appPrescriptionSlice = createSlice({
    name: 'appPrescription',
    initialState: {
        prescriptions: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPrescription.fulfilled, (state, action) => {
                state.prescriptions = action.payload
            })
    }
})

export default appPrescriptionSlice.reducer