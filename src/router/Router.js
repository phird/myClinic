// ** Router imports
import { lazy } from 'react'

// ** Router imports
import { useRoutes, Navigate  } from 'react-router-dom'
import { useEffect } from 'react';

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

// ** Utils

import { getUserData, isUserLoggedIn } from '../utility/Utils'

// ** GetRoutes
import { getRoutes } from './routes'

// ** Components
const Error = lazy(() => import('../views/pages/misc/Error'))
const Login = lazy(() => import('../views/pages/authentication/Login'))
const NotAuthorized = lazy(() => import('../views/pages/misc/NotAuthorized'))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()
  const allRoutes = getRoutes(layout)

  const getHomeRoute = () => {
    const user = isUserLoggedIn();
    //console.log(" [getHomeRoute]here a user ", user)
    if (user) {
      //console.log("Redirecting to /home");
      return ('/home');
    } else {
      //console.log("Redirecting to /login");
      return ('/login');
    }
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
