// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import jwtDecode from 'jwt-decode'

const config = useJwt.jwtConfig

const initialUser = () => {
  const cookies = document.cookie;
  let userData = {};

  if (cookies) {
    const cookiePairs = cookies.split("; ");
    for (let i = 0; i < cookiePairs.length; i++) {
      const cookiePair = cookiePairs[i].split('=');
      const cookieName = decodeURIComponent(cookiePair[0]);
      const cookieValue = decodeURIComponent(cookiePair[1]);
      if (cookieName === 'accessToken') {
        // Decode the access token to extract the user data
        const decodedToken = jwtDecode(cookieValue);
        //console.log("here is decoded Token : ", decodedToken)
        userData = decodedToken ? decodedToken : {};
        break;
      }
    }
  }

  return userData ? userData : {};
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      document.cookie = `${config.storageTokenKeyName}=${action.payload.accessToken}; path=/;`
      document.cookie = `${config.storageRefreshTokenKeyName}=${action.payload.refreshToken}; path=/;`
      // ! legacy code which store user login data in localstorage ! 
      //localStorage.setItem('userData', JSON.stringify(action.payload))
      //localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken))
      //localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
    },

    handleLogout: state => {
      state.userData = {}
      state[config.storageTokenKeyName] = null
      state[config.storageRefreshTokenKeyName] = null
      document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = `${config.storageTokenKeyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `${config.storageRefreshTokenKeyName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      // ! legacy code which store user login data in localstorage ! 
      //localStorage.removeItem('userData')
      //localStorage.removeItem(config.storageTokenKeyName)
      //localStorage.removeItem(config.storageRefreshTokenKeyName)
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
