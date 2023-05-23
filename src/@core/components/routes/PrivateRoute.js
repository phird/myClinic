// ** React Imports
import { Navigate } from 'react-router-dom'
import { useContext, Suspense } from 'react'
import { isUserLoggedIn, getUserData } from '../../../utility/Utils'
// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'

// ** Spinner Import
import Spinner from '../spinner/Loading-spinner'

const PrivateRoute = ({ children, route }) => {
  //console.log("🔒🚔 in private route ", children, "  and  " , route)
  // ** Hooks & Vars
  const ability = useContext(AbilityContext)
  //console.log("ability in private Route", ability)
  //const user = JSON.parse(localStorage.getItem('userData'))
  const user = getUserData();
  //console.log("🔒 user in private route ", user)

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {
      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }
    if (!user) {
      return <Navigate to='/login' />
    }
    if (user && restrictedRoute) {
      return <Navigate to='/' />
    }
    if (user && restrictedRoute && user.role === 'general') {
      return <Navigate to='/' />
    }
    if (user && !ability.can(user.action || 'read', resource)) {
      //console.log(ability.can(user.action, resource))
      return <Navigate to='/misc/not-authorized' replace />
    }
  }

  return <Suspense fallback={<Spinner className='content-loader' />}>{children}</Suspense>
}

export default PrivateRoute
