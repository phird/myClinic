import useJwt from '@src/@core/auth/jwt/useJwt'

export const isUserLoggedIn = () => {
  //console.log("this also called ")
  //console.log("in isUserLoggedIN ")
  //console.log("[bool]: isUserLoggedIn return => ")
  //console.log(document.cookie.includes('userData') && document.cookie.includes(useJwt.jwtConfig.storageTokenKeyName))
  //! legacy code 
  //return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
  return document.cookie.includes('userData') && document.cookie.includes(useJwt.jwtConfig.storageTokenKeyName);
}

//export const getUserData = () => JSON.parse(localStorage.getItem('userData'))
export const getUserData = () => {
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
};
