import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import Loader from 'components/Loader'
import AppRoutes from 'routes'
import { store } from 'index'

const Root = () => (
  <Provider store={store}>
    <Router>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </Router>
  </Provider>
)

export default hot(Root)
