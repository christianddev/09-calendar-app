import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/">Calendar</Link>
        </li>
      </ul>

      <Switch>
        <div>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={CalendarScreen} />
          <Redirect  to="/"/>
        </div>
      </Switch>
    </Router>
  )
}
