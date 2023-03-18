// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import users from '@src/views/apps/user/store'
import patients from '@src/views/apps/patients/store'
import encounters from '@src/views/apps/encounter/store'
import drugs from '@src/views/apps/drugs/store'
import prescription from '@src/views/apps/prescription/store'
import invoice from '@src/views/apps/invoice/store'
import service from '@src/views/apps/services/store'
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
  drugs,
  prescription,
  navbar,
  layout,
  invoice,
  calendar,
  dataTables,
  permissions,
  service,
})

export {rootReducer, combineReducers} 