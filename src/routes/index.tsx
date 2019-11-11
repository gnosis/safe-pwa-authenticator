import React from 'react'
import { Switch, Redirect, Route, withRouter } from 'react-router-dom'
import { WELCOME_URL } from './routes'

const Welcome = React.lazy(() => import('./Welcome'))

const AppRoutes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => {
        return <Redirect to={WELCOME_URL} />
      }}
    />
    <Route exact path={WELCOME_URL} component={Welcome} />
    <Redirect to="/" />
  </Switch>
)

export default withRouter(AppRoutes)
