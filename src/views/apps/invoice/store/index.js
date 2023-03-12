// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLatestEncounterID } from '../../encounter/store'
// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appInvoice/getData', async params => {
  const response = await axios.get('/apps/invoice/invoices', params)
  return {
    params,
    data: response.data.invoices,
    allData: response.data.allData,
    totalPages: response.data.total
  }
})
export const deleteInvoice = createAsyncThunk('appInvoice/deleteInvoice', async (id, { dispatch,getState}) => {
  await axios.delete('/apps/invoice/delete', { id })
  await dispatch(getData(getState().invoice.params))
  return id
})


export const createInvoice = createAsyncThunk('appInvoice/createInvoice', async(data,{dispatch,getState})=> {
  const encounterID = await dispatch(getLatestEncounterID());
  data['encounterID'] = encounterID.payload;
  //** NEED TO POST name and price to Invoice_List table */
  console.log("data in CreateInvoice")
  console.log(data)
  const response = await axios.post('http://localhost:8000/invoice/createInvoice', data)
})

export const getInvoice = createAsyncThunk('appInvoice/getInvoice', async(encounterID) => {
  try {
    const response = await axios.get(`http://localhost:8000/invoice/getInvoice/${encounterID}`);
    console.log("response from getInvoice => ");
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
})


export const appInvoiceSlice = createSlice({
  name: 'appInvoice',
  initialState: {
    invoice: [],
    data: [], // delete
    total: 1,
    params: {},// delete
    allData: []// delete
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
      state.params = action.payload.params
    })
    .addCase(getInvoice.fulfilled, (state,action)=>{
      state.invoice = action.payload
    })
  }
})

export default appInvoiceSlice.reducer
