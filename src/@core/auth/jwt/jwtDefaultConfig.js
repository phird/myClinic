// ** Auth Endpoints
export default {
  loginEndpoint: 'http://localhost:8000/jwt/v2/login',
  tokenVerifyEndpoint : 'http://localhost:8000/jwt/verify-token',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken', // use for set name -> cookie ~
  storageRefreshTokenKeyName: 'refreshToken'
}
