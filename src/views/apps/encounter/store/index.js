///**  Fix call encounter Here ! 
// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
//* IMPORT 
import { createInvoice } from '../../invoice/store'
import { createPrescription } from '../../prescription/store'

export const getAllEncounter = createAsyncThunk('appEncounters/getAllEncounter', async () => {
  const response = await axios.get('http://localhost:8000/app/Encounter/list/data')
  return response.data.encounter
})

export const getEncounterData = createAsyncThunk('appEncounters/getEncounterData', async params => {
  const response = await axios.get('http://localhost:8000/app/Encounter/list/getdata', {params: params})
  return {
    params,
    data: response.data.encounters,
    totalPage: response.data.encounters.length
  }
})

// to create an empty encounter 
export const postEncounter = createAsyncThunk('appEncounter/postEncounter', async (newData, { dispatch, getState }) => {
  const response = await axios.post('http://localhost:8000/app/Encounter/createEncounter', newData)
  await dispatch(createInvoice(newData));
  await dispatch(createPrescription(newData));
  return response.data
})

export const handleSubmitEncounter = createAsyncThunk('appEncounter/handleSubmitEncounter', async(encounterID)=>{
  try {
    await axios.put(`http://localhost:8000/app/Encounter/handleSubmit/${encounterID}`)
  } catch (error) {
    console.log(error)
  }
})

//** 🙋🏻‍♂️ get specific encounter for patient  */
export const getPatientEncounter = createAsyncThunk('appPatient/getEncounter', async params => {
  const response = await axios.get(`http://localhost:8000/app/Patient/list/getPatientEncounter`, {params : params})
  if (response.status == 200) {
    return {
      params,
      data: response.data.encounter,
      totalPage: 10
    }
  } return {
    data: null,
    totalPage: 1
  }
}
)


//** ⭐️ legacy get encounter  */

export const getEncounter = createAsyncThunk('appEncounter/getEncounter', async id => {
  const response = await axios.get(`http://localhost:8000/app/Encounter/encounters/encounter/${id}`)
  return response.data.encounter[0]
})

export const getLatestEncounterID = createAsyncThunk('appEncounter/getLatestEncounterID', async () => {
  const idLastes = await axios.get('http://localhost:8000/app/Encounter/latestID')
  const enid = idLastes.data[0].id
  return enid
})

//** end of code encounter */
export const addNote = createAsyncThunk('appEncounter/addNote', async (dataArray) => {
  try {
    const response = await axios.put('http://localhost:8000/app/Encounter/addNote', dataArray)
    return response;
  } catch (error) {
    console.log("an error in addNote")
    console.log(error.response)
  }
})
//**  end of encounterSYMPTOM


// ** 🧸 Widget in Patient View 
export const getWidgetEncounter = createAsyncThunk('appEncounter/getWidgetEncounter', async id => {
  try {
    const response = await axios.get(`http://localhost:8000/app/Encounter/widgetData/${id}`)
    console.log(response)
    return {
      data: response.data[0],
      total : response.data
    }
    
  } catch (error) {
    console.log("error in store Encoutner GetWidget")
    console.error(error)
  }
})



//* For Encounter SYMPTOM 
export const getSymptoms = createAsyncThunk('appEncounter/getSymptoms', async(encounterID)=> {
  try{
    const response = await axios.get('http://localhost:8000/encounterSymptom/getSymptoms', {params: {encounterID}} );
    return response.data
  }
  catch(err){
    console.log('an error in getSymptoms')
  }
})

export const addSymptom = createAsyncThunk('appEncounter/addSymptom', async (dataArray) => {
  try {
    const response = await axios.post('http://localhost:8000/encounterSymptom/addSymptom', dataArray);
    return response;
  } catch (error) {
    console.log('an error in addSymptom')
    console.log(error.response);
  }
})


export const addUrl = createAsyncThunk('appEncounter/addUrl', async (dataArray) => {
  try{
    await axios.post('http://localhost:8000/app/Encounter/imgUrl', dataArray)
  }catch (error){
    console.log(error)
  }
} )

export const getImg = createAsyncThunk('appEncounter/getImg', async id => {
  try{
    const response = await axios.get(`http://localhost:8000/app/Encounter/img/${id}`)
    return response.data
  }catch(error){
    console.log(error)
  }
})

export const forExport = createAsyncThunk('appEncounters/forExport', async () => {
  try{
    const response = await axios.get(`http://localhost:8000/app/Encounter/forExport`)
    return response.data
  }catch(error){
    console.log(error)
  }
})




export const deleteEncounter = createAsyncThunk('appEncounters/deleteEncounter', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/encounter/delete', { id })
  await dispatch(getData(getState().encounters.params))
  await dispatch(getAllData())
  return id
})

export const getDoctorForUser = createAsyncThunk('appEncounters/getDoctorForUser', async () => {
  try {
    const doctor =  await axios.get('http://localhost:8000/staff/list/doctor')
    return {
      data: doctor.data,
      total: doctor.data.length
    }
  } catch (error) {
    console.log("error while getting staff")
    console.error(error)
  }
})




//** ============================================ */

export const appEncountersSlice = createSlice({
  name: 'appEncounters',
  initialState: {
    data: [],
    encounter: [],
    total: 1,
    etotal: 1,
    symptoms: [],
    params: {},
    allData: [],
    widgetData: [],
    widgetlength : 0, 
    imgList: [],
    export: [],
    doctorList: [],
    doctorListTotal: 1 ,
    selectedEncounter: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllEncounter.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getEncounterData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPage
      })
      .addCase(getEncounter.fulfilled, (state, action) => {
        state.selectedEncounter = action.payload
      })
      .addCase(postEncounter.fulfilled, (state, action) => {
        state.data.push(action.payload)
        state.total = state.total + 1;
      })
      .addCase(getSymptoms.fulfilled, (state,action) => {
        state.symptoms = action.payload
      })
      .addCase(getPatientEncounter.fulfilled, (state, action)=>{
        state.encounter = action.payload.data
        state.etotal = action.payload.totalPage
      })
      .addCase(getWidgetEncounter.fulfilled, (state, action) => {
        state.widgetData = action.payload.data
        state.widgetlength = action.payload.total
      })
      .addCase(addUrl.fulfilled, (state,action) => {})
      .addCase(getImg.fulfilled, (state,action) =>{
        state.imgList = action.payload
      })
      .addCase(forExport.fulfilled, (state,action)=>{
        state.export = action.payload
      })
      .addCase(getDoctorForUser.fulfilled, (state,action)=> {
        state.doctorList = action.payload.data
        state.doctorListTotal = action.payload.total
      })

  }
})

export default appEncountersSlice.reducer
