import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Forgot from './Components/Auth/Forgot';
import ResetPassword from './Components/Auth/ResetPassword';
import Home from './Components/Home';
import PrivateRoute from './Components/Auth/ProtectedRoutes/PrivateRoute';
import LrfRoute from './Components/Auth/ProtectedRoutes/LrfRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { loadUser } from './redux/extraReducers/loadUserExtraReducer';


function App() {
  
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.authReducer);
  useEffect(() => {
    dispatch(loadUser());
  },[isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <LrfRoute exact path='/login' component={Login} />
          <LrfRoute exact path='/register' component={SignUp} />
          <LrfRoute exact path='/forgot' component={Forgot} />
          <Route exact path = '/resetpassword/:resetToken' component={ResetPassword} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
