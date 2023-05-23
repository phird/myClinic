import { Ability } from '@casl/ability'
import { initialAbility } from './initialAbility'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
import jwtDecode from 'jwt-decode';


const getUserData = () => { //! if user already loggedin 
  const cookies = document.cookie;
  let userData = {};
  let userAbility = []

  if (cookies) {
    const cookiePairs = cookies.split("; ");
    for (let i = 0; i < cookiePairs.length; i++) {
      const cookiePair = cookiePairs[i].split('=');
      const cookieName = decodeURIComponent(cookiePair[0]);
      const cookieValue = decodeURIComponent(cookiePair[1]);
      if (cookieName === 'accessToken') {
        // Decode the access token to extract the user data
        const decodedToken = jwtDecode(cookieValue);
        userData = decodedToken ? decodedToken : {};
        if(userData){
          userAbility = [
            {
              action: userData.action,
              subject: userData.subject
            }
          ]
        }
        break;
      }
    }
  }

  return { userData, userAbility };
};

const {userData, userAbility} = getUserData();
const existingAbility = userData ? userAbility : null



export default new Ability(existingAbility || initialAbility)
