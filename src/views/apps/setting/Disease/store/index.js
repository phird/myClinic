// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'


const diseaseURL = 'http://localhost:8000/v1/diseases/api'

export const getAllData = createAsyncThunk('disease/getAllData', async () => {
    const response = await axios.get(`${diseaseURL}`)
    return response.data
})

export const getData = createAsyncThunk('disease/getData', async (params) => {
    try {
        const response = await axios.get(`${diseaseURL}/data`, { params: params })
        return {
            params: params,
            data: response.data,
            total: response.data.length
        }
    } catch (error) {
        console.log('error occurs in getData => ')
        console.error(error)
    }
})

export const getDisease = createAsyncThunk('disease/getDisease', async (id) => {
    try {
        const response = await axios.get(`${diseaseURL}/disease/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteDisease = createAsyncThunk('disease/deleteDisease', async (id) => {
    try {
        await axios.delete(`${diseaseURL}/disease/${id}`)
    } catch (error) {
        console.log("error occur in client side - > ")
        console.error(error)
    }
})

export const createDisease = createAsyncThunk('disease/createDisease', async (newData, {dispatch}) => {
    try {
        await axios.post(`${diseaseURL}/create-disease`, newData)
        await dispatch(getData())
    } catch (error) {
        console.log(error)
    }
})


// handle case Change Disease Name
export const editDisease = createAsyncThunk('disease/editDisease', async (newData) => {
    console.log("data in edit")
    console.log(newData)
    try {

    } catch (error) {

    }
})

// EditSymptoms -> incase Create a new One 
export const createSymptom = createAsyncThunk('disease/createSymptom', async (data) => {
    try {
        await axios.post(`${diseaseURL}/symptom`, data)
    } catch (error) {
        console.log(error)
    }
})

// EditSymptoms -> in case Delete old one
export const deleteSymptom = createAsyncThunk('disease/deleteSymptom', async (isDelete, {dispatch}) => {
    try {
        await axios.delete(`${diseaseURL}/symptom`, {data : isDelete})
        await dispatch(getData())
    } catch (error) {
        console.log(error)
    }
})



export const DiseaseSlice = createSlice({
    name: 'Disease',
    initialState: {
        data: [],
        total: 1,
        params: {},
        allData: [],
        selectedDisease: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllData.fulfilled, (state, action) => {
                state.allData = action.payload
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.params = action.payload.params
                state.data = action.payload.data
                state.total = action.payload.total
            })
            .addCase(getDisease.fulfilled, (state, action) => {
                state.selectedDisease = action.payload
            })
    }
})

export default DiseaseSlice.reducer
