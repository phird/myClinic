import React, { Suspense } from 'react'

// ** Router Import
import Router from './router/Router'
import { BrowserRouter } from 'react-router-dom';



const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
