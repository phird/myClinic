import { DefaultRoute } from '../router/routes'
import jwtDecode from 'jwt-decode'
import useJwt from '@src/auth/jwt/useJwt'
import { Jwt } from 'jsonwebtoken'


const config = useJwt.jwtConfig


// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */

// export const isUserLoggedIn = () => localStorage.getItem('userData')
// export const getUserData = () => JSON.parse(localStorage.getItem('userData'))
//export const isUserLoggedIn = () => document.cookie.includes('userData');


export const isUserLoggedIn = async () => {  // not returning a bool but returning a userdata
  //return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
  const accessTokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${config.storageTokenKeyName}=`));

  if (accessTokenCookie) {
    const token = accessTokenCookie.split('=')[1];
    try {
      // Verify the access token using the secret or public key
      const decodedToken = await useJwt.verify(token);
      return decodedToken.data.isValid; // Return the userData object

    } catch (error) {
      // Token verification failed
      console.error('Access token verification failed:', error);
      return false;
    }
  }

  return false;
}

export const getUserData = () => {
  const accessTokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${config.storageTokenKeyName}=`));
  if (accessTokenCookie) {
    const accessToken = accessTokenCookie.split('=')[1];
    const decodedToken = jwtDecode(accessToken);
    const userData = decodedToken;
    return userData; // Return the userData object
  }
  return null
};




// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})
