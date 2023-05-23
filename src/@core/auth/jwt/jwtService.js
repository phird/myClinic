import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false


  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }
    // ** Request Interceptor
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage // Cookie
        const accessToken = this.getToken()
        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        //console.log("config : ", config)
        return config
      },
      error => Promise.reject(error)
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      response => response,
      error => {
        // ** const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config

        // ** if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              this.isAlreadyFetchingAccessToken = false

              // ** Update accessToken in localStorage
              this.setToken(r.data.accessToken)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.accessToken)
            })
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axios(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      }
    )
  }




  // config this section into cookie 
  // ** Get token !  --- > Token Session

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    const cookies = document.cookie;
    if (cookies) {
      const cookiePairs = cookies.split("; ")
      for (let i = 0; i < cookiePairs.length; i++) {
        const cookiePair = cookiePairs[i].split('=');
        const cookieName = decodeURIComponent(cookiePair[0]);
        if (cookieName === this.jwtConfig.storageTokenKeyName) {
          const token = cookiePair[1];
          //console.log("this what get Token() return : ", token)
          return token;
        }
      }
    }
    return null;
  }



  getRefreshToken() {
    const cookies = document.cookie;
    if (cookies) {
      const cookiePairs = cookies.split("; ")
      const cookieData = {};

      for (let i = 0; i < cookiePairs.length; i++) {
        const cookiePair = cookiePairs[i].split('=');
        const cookieName = decodeURIComponent(cookiePair[0]);
        const cookieValue = decodeURIComponent(cookiePair[1]);
        cookieData[cookieName] = cookieValue;
        if (cookieName === this.jwtConfig.storageRefreshTokenKeyName) {
          const token = cookiePair[1];
          //console.log("this what get Token() return : ", token)
          return token;
        }
      }
    }
    return null;
  }

  setToken(value) {
    document.cookie = `${this.jwtConfig.storageTokenKeyName} = ${value}`
  }

  setRefreshToken(value) {
    document.cookie = `${this.jwtConfig.storageRefreshTokenKeyName}=${value}`
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
    // end handle login
  }

  async verify(token) {
    return axios.post(this.jwtConfig.tokenVerifyEndpoint, { accessToken: token });
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }
}
