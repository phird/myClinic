// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import users from '@src/views/apps/user/store'
import patients from '@src/views/apps/patients/store'
import encounters from '@src/views/apps/encounter/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'
import { combineReducers } from 'redux'
import { DESTROY_SESSION } from './actions/types';

// Combine all reducers.
const appReducer = combineReducers({
  state: (state = {}) => state
})

const rootReducer = combineReducers({
  auth,
  users,
  patients,
  encounters,
  navbar,
  layout,
  invoice,
  calendar,
  dataTables,
  permissions,
})

export {rootReducer, combineReducers} 