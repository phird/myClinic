// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLatestEncounterID } from '../../encounter/store'
// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appInvoice/getData', async (params) => {
  const response = await axios.get('http://localhost:8000/invoice/getInvoice', {params: params})
  console.log("in getData")
  console.log(response)
  return {
    params,
    data: response.data,
    total: response.data.length
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

export const getInvoiceDetail = createAsyncThunk('appInvoice/getInvoiceDetail', async(invID) => {
  try {
    const response = await axios.get(`http://localhost:8000/invoice/getInvoiceDetail/${invID}`)
    console.log("response from getInvoiceDetail");
    console.log(response.data)
    return response.data[0]
  } catch (error) {
    console.log(error)
  }
})

export const getInvoiceList = createAsyncThunk('appInvoice/getInvoceList', async(invID) => {
  try {
    const response = await axios.get(`http://localhost:8000/invoice/getInvoiceList/${invID}`) 
    console.log("response from getInvoiceList")
    console.log(response)
    console.log("=============================")
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const postInvoiceList = createAsyncThunk('appInvoice/postInvoiceList' , async(invoiceArray) => {
  console.log("in STORE here is InvoiceArray")
  console.log(invoiceArray)
  try {
    await axios.post('http://localhost:8000/invoice/addInvoiceList', invoiceArray);
  } catch (error) {
    console.log(error)
  }
})


export const appInvoiceSlice = createSlice({
  name: 'appInvoice',
  initialState: {
    invoice: [],
    data: [],
    detail: [],
    params : [],
    expenseList: [], // delete
    total: 1,
    allData: []// delete
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.params = action.payload.params
      state.total = action.payload.total
    })
    .addCase(getInvoice.fulfilled, (state,action)=>{
      state.invoice = action.payload
    })
    .addCase(getInvoiceDetail.fulfilled, (state,action) => {
      state.detail = action.payload
    })
    .addCase(getInvoiceList.fulfilled, (state,action)=> {
      state.expenseList = action.payload
    })
  }
})

export default appInvoiceSlice.reducer
